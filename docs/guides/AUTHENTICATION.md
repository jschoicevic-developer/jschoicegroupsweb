# Authentication System Documentation

## Overview
Complete authentication system for the JS Choice admin panel with login, logout, and session management.

## Features Implemented

### 1. **Login Functionality** ✅
- **Location**: `/admin/login`
- **File**: `src/app/admin/login/page.tsx`
- **Features**:
  - Real Supabase authentication
  - Email/password login
  - Error handling with user-friendly messages
  - Loading states
  - Redirect to original page after login
  - Remember me checkbox (UI ready)

**Credentials**:
- Email: `admin@jschoicegroups.com`
- Password: `Admin@123`

### 2. **Logout Functionality** ✅
- **API Route**: `/api/auth/logout`
- **File**: `src/app/api/auth/logout/route.ts`
- **Features**:
  - Clears Supabase session
  - Redirects to login page
  - Available in multiple locations:
    - Sidebar logout button
    - Header profile dropdown

### 3. **Session Management** ✅
- **API Route**: `/api/auth/session`
- **File**: `src/app/api/auth/session/route.ts`
- **Features**:
  - Returns current user session
  - Used for authentication checks

### 4. **Authentication Hook** ✅
- **File**: `src/hooks/useAuth.ts`
- **Features**:
  - Manages authentication state
  - Provides user data
  - Handles logout
  - Auto-redirects on auth state changes
  - Loading states

**Usage**:
```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      {user?.email}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 5. **Middleware Protection** ✅
- **File**: `src/middleware.ts`
- **Features**:
  - Protects all `/admin/*` routes
  - Allows `/admin/login` access
  - Handles trailing slashes correctly
  - Redirects unauthenticated users to login
  - Redirects authenticated users away from login

### 6. **UI Integration** ✅

#### **Admin Sidebar**
- **File**: `src/components/admin/AdminSidebar.tsx`
- **Features**:
  - Functional logout button
  - Displays user email
  - Shows user initials in avatar
  - Loading state during logout

#### **Admin Header**
- **File**: `src/components/admin/AdminHeader.tsx`
- **Features**:
  - Profile dropdown menu
  - User info display
  - Logout option in dropdown
  - Settings link
  - Animated dropdown with Framer Motion

## Authentication Flow

### Login Flow
1. User navigates to `/admin/login`
2. Enters credentials
3. Supabase validates credentials
4. Session is created
5. User is redirected to `/admin` (or original destination)
6. Middleware allows access to protected routes

### Logout Flow
1. User clicks logout (sidebar or header)
2. `useAuth` hook calls `/api/auth/logout`
3. Supabase session is cleared
4. User is redirected to `/admin/login`
5. Auth state listener updates UI

### Protected Route Access
1. User tries to access `/admin/*`
2. Middleware checks for session
3. If no session: redirect to `/admin/login?redirect=/admin/*`
4. If session exists: allow access
5. After login: redirect to original page

## API Routes

### POST `/api/auth/logout`
**Purpose**: Logout current user

**Request**: None required

**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET `/api/auth/session`
**Purpose**: Get current session info

**Request**: None required

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "admin@jschoicegroups.com",
      ...
    },
    "expiresAt": "..."
  }
}
```

## Security Features

1. **Server-side session validation** via middleware
2. **Secure cookie-based sessions** via Supabase
3. **Protected API routes** (can be extended)
4. **Auto-logout on session expiry**
5. **CSRF protection** via Supabase

## User Experience Features

1. **Loading states** during authentication
2. **Error messages** for failed login
3. **Smooth redirects** after login/logout
4. **Persistent sessions** (optional remember me)
5. **Real-time auth state updates**
6. **Animated UI transitions**

## Testing

### Test Login
1. Navigate to `https://jschoice-website.vercel.app/admin/login`
2. Enter: `admin@jschoicegroups.com` / `Admin@123`
3. Click "Login"
4. Should redirect to `/admin` dashboard

### Test Logout
1. Click logout button in sidebar
2. Should redirect to `/admin/login`
3. Try accessing `/admin` - should redirect to login

### Test Protected Routes
1. Logout if logged in
2. Try accessing `https://jschoice-website.vercel.app/admin`
3. Should redirect to `/admin/login?redirect=/admin`
4. Login
5. Should redirect back to `/admin`

## Future Enhancements

1. **Password Reset**: Email-based password recovery
2. **Remember Me**: Persistent sessions across browser restarts
3. **Two-Factor Authentication**: Additional security layer
4. **Session Timeout Warning**: Notify before auto-logout
5. **Activity Logging**: Track login/logout events
6. **Role-based Access**: Different permission levels

## Troubleshooting

### Login not working
- Check Supabase credentials in `.env`
- Verify user exists in `auth.users` table
- Check browser console for errors

### Redirect loop
- Clear browser cookies
- Check middleware configuration
- Verify `trailingSlash` setting in `next.config.ts`

### Session not persisting
- Check Supabase cookie settings
- Verify middleware is running
- Check browser cookie storage

## Files Modified/Created

### Created
- `src/app/api/auth/logout/route.ts`
- `src/app/api/auth/session/route.ts`
- `src/hooks/useAuth.ts`

### Modified
- `src/app/admin/login/page.tsx` - Added real authentication
- `src/middleware.ts` - Fixed trailing slash handling
- `src/components/admin/AdminSidebar.tsx` - Added logout functionality
- `src/components/admin/AdminHeader.tsx` - Added profile dropdown with logout

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://htszyyiptlahwkdgcbjq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Dependencies

- `@supabase/supabase-js` - Supabase client
- `@supabase/ssr` - Server-side rendering support
- `framer-motion` - UI animations
- `lucide-react` - Icons
- `next` - Framework

---

**Last Updated**: 2026-02-07
**Version**: 1.0.0
