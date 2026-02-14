/**
 * Authentication Hook
 * Provides authentication state and methods throughout the app
 */

'use client';

import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        // Get initial session
        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
            } catch (error) {
                console.error('Error getting session:', error);
            } finally {
                setLoading(false);
            }
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);

                // Refresh the page when auth state changes
                if (event === 'SIGNED_OUT') {
                    router.push('/admin/login');
                    router.refresh();
                } else if (event === 'SIGNED_IN') {
                    router.refresh();
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, router]);

    const logout = async () => {
        try {
            setLoading(true);

            // Call the logout API
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Sign out from Supabase
            await supabase.auth.signOut();

            // Redirect to login
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
            // Even if API fails, try to sign out locally
            await supabase.auth.signOut();
            router.push('/admin/login');
            router.refresh();
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        logout,
        isAuthenticated: !!user,
    };
}
