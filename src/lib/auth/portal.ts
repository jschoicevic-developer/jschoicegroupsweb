export type AuthPortal = 'admin' | 'blogger';

export const RESET_EMAIL_KEY = 'reset_email';

export function parsePortal(value: string | null | undefined): AuthPortal {
    return value === 'blogger' ? 'blogger' : 'admin';
}

export function getLoginUrl(portal: AuthPortal): string {
    return portal === 'blogger' ? '/blogger/login' : '/admin/login';
}

export function getDashboardUrl(role: string | undefined, portal: AuthPortal): string {
    if (role === 'blogger') return '/blogger';
    return portal === 'blogger' ? '/blogger' : '/admin';
}

export function getSiteUrl(): string {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function authPath(path: string, portal: AuthPortal): string {
    return `${path}?portal=${portal}`;
}
