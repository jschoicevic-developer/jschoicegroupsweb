-- =====================================================================
-- Create admin user
-- Inserts into auth.users (Supabase Auth) AND profiles (role = 'admin').
--
-- Edit the three values below, then run once in the Supabase SQL Editor.
-- Safe to re-run — if the email already exists, the password and
-- profile role are updated in place.
-- =====================================================================

DO $$
DECLARE
    -- >>> EDIT THESE VALUES <<<
    admin_email     TEXT := 'admin@jschoicegroup.com.au';
    admin_password  TEXT := 'CHANGE_ME_TO_REAL_PASSWORD';
    admin_name      TEXT := 'JS Choice Admin';
    -- --------------------------

    new_user_id     UUID;
BEGIN
    -- 1. Look up existing user by email
    SELECT id INTO new_user_id FROM auth.users WHERE email = admin_email;

    IF new_user_id IS NULL THEN
        -- Create new auth user
        new_user_id := gen_random_uuid();

        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            new_user_id,
            'authenticated',
            'authenticated',
            admin_email,
            crypt(admin_password, gen_salt('bf')),
            NOW(),
            '{"provider":"email","providers":["email"]}'::jsonb,
            jsonb_build_object('full_name', admin_name),
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );

        -- Create matching identities row (required for email/password login)
        INSERT INTO auth.identities (
            id,
            user_id,
            identity_data,
            provider,
            provider_id,
            last_sign_in_at,
            created_at,
            updated_at
        ) VALUES (
            gen_random_uuid(),
            new_user_id,
            jsonb_build_object('sub', new_user_id::text, 'email', admin_email),
            'email',
            admin_email,
            NOW(),
            NOW(),
            NOW()
        );

        RAISE NOTICE 'Created new admin user. id=% email=%', new_user_id, admin_email;
    ELSE
        -- Update password on existing user
        UPDATE auth.users
        SET encrypted_password = crypt(admin_password, gen_salt('bf')),
            email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
            updated_at         = NOW()
        WHERE id = new_user_id;

        RAISE NOTICE 'Updated existing user password. id=% email=%', new_user_id, admin_email;
    END IF;

    -- 2. Create / upgrade profile row with role = 'admin'
    INSERT INTO profiles (id, display_name, role, email_notifications)
    VALUES (new_user_id, admin_name, 'admin', true)
    ON CONFLICT (id) DO UPDATE
        SET role         = 'admin',
            display_name = COALESCE(profiles.display_name, EXCLUDED.display_name);

    RAISE NOTICE 'Admin profile ready for %', admin_email;
END $$;
