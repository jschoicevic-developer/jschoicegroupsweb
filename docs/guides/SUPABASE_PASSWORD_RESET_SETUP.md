# Supabase Password Reset (OTP) Setup

Required one-time configuration in the Supabase Dashboard for the forgot-password flow to work.

## 1. URL Configuration

Go to **Authentication → URL Configuration**:

| Setting | Value |
|---------|-------|
| Site URL | `https://jschoicegroup.com.au` (production) |
| Redirect URLs | `http://localhost:3000/auth/callback` |
| | `https://jschoicegroup.com.au/auth/callback` |
| | `https://www.jschoicegroup.com.au/auth/callback` |

**Important:** If `/auth/callback` is missing from Redirect URLs, Supabase sends users to the homepage with `?code=...` instead of the reset-password page. The app middleware forwards those to `/auth/callback`, but you should still add the callback URLs above.

## 2. Reset Password Email Template

Go to **Authentication → Email Templates → Reset Password**.

Ensure the template includes the OTP token so users can enter the 6-digit code:

```html
<h2>Reset your password</h2>
<p>Your verification code:</p>
<p style="font-size: 24px; font-weight: bold; letter-spacing: 0.2em;">{{ .Token }}</p>
<p>Or click this link to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
```

The `{{ .Token }}` variable sends the 6-digit OTP used on `/auth/verify-otp`.
The `{{ .ConfirmationURL }}` link is the magic-link fallback handled by `/auth/callback`.

## 3. Environment Variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (must match your deployed domain in production)

## Flow

1. User clicks **Forgot Password?** on `/admin/login` or `/blogger/login`
2. `/auth/forgot-password` sends OTP via Supabase
3. `/auth/verify-otp` verifies the 6-digit code
4. `/auth/reset-password` sets the new password (requires verified recovery session)
