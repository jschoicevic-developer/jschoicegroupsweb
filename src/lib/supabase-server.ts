/**
 * Supabase Server Client (Server Components)
 * Used for server-side operations with anon key and automatic cookie handling
 */

import { createServerClient as createSsrClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createServerClient = async () => {
    const cookieStore = await cookies();

    return createSsrClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );
};
