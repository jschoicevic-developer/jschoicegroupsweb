"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Shield,
    Bell,
    Save,
    Camera,
    Loader2,
    Lock,
    LogOut
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('profile');

    // Form States
    const [displayName, setDisplayName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [emailNotifications, setEmailNotifications] = useState(true);

    // Password Form
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        const supabase = createClient();

        try {
            // Get Auth User
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                router.push('/admin/login');
                return;
            }
            setUser(user);
            setEmail(user.email || '');

            // Get Profile Data
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profile) {
                setProfile(profile);
                setDisplayName(profile.display_name || '');
                setJobTitle(profile.job_title || '');
                setPhone(profile.phone || '');
                setAvatarUrl(profile.avatar_url || null);
                setEmailNotifications(profile.email_notifications ?? true);
            } else {
                // If no profile exists yet, use auth data fallback
                setDisplayName(user.user_metadata?.full_name || '');
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        setSaving(true);
        const supabase = createClient();

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            // Upload to 'profiles' bucket (ensure it exists and is public)
            const { error: uploadError } = await supabase.storage
                .from('profiles')
                .upload(filePath, file, { cacheControl: '3600', upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('profiles')
                .getPublicUrl(filePath);

            setAvatarUrl(publicUrl);
            alert('Profile image uploaded! Click Save Changes to apply.');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please ensure a "profiles" storage bucket exists.');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateProfile = async () => {
        setSaving(true);
        const supabase = createClient();

        try {
            // 1. Separate Email Update with specific error handling
            if (email !== user?.email) {
                const confirmed = window.confirm(`Change email address to ${email}? You will need to verify the new email.`);
                if (confirmed) {
                    const { error: emailError } = await supabase.auth.updateUser({ email });
                    if (emailError) {
                        if (emailError.message.includes('rate limit')) {
                            alert('Email update failed: Too many requests. Please wait about an hour before trying to change your email again. Your other changes will still be saved.');
                        } else {
                            throw emailError;
                        }
                    } else {
                        alert('A confirmation email has been sent to your new address.');
                    }
                }
            }

            // 2. Update Profile Table (Name, Job, Phone, Avatar)
            const updates = {
                id: user?.id,
                display_name: displayName,
                job_title: jobTitle,
                phone: phone,
                avatar_url: avatarUrl,
                email_notifications: emailNotifications,
                updated_at: new Date().toISOString(),
            };

            const { error: profileError } = await supabase.from('profiles').upsert(updates);
            if (profileError) throw profileError;

            // 3. Update Auth Metadata
            await supabase.auth.updateUser({
                data: {
                    full_name: displayName,
                    avatar_url: avatarUrl
                }
            });

            alert('Profile saved successfully!');
            fetchProfile(); // Refresh UI
        } catch (error: any) {
            console.error('Error updating profile:', error);
            alert(error.message || 'Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        setSaving(true);
        const supabase = createClient();

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });
            if (error) throw error;

            alert('Password updated successfully!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Failed to update password.');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 pb-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
                        Account <span className="text-primary">Settings</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Manage your profile, preferences, and security settings.
                    </p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
                    <LogOut size={16} />
                    Sign Out
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 space-y-1">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'profile'
                            ? 'bg-primary text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <User size={18} />
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'notifications'
                            ? 'bg-primary text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Bell size={18} />
                        Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'security'
                            ? 'bg-primary text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Shield size={18} />
                        Security
                    </button>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass-card p-6 sm:p-8 rounded-[2rem]"
                    >
                        {activeTab === 'profile' && (
                            <div className="space-y-8">
                                <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-100">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-bold overflow-hidden border-4 border-white shadow-lg relative">
                                            {avatarUrl ? (
                                                <Image quality={80} src={avatarUrl} alt={displayName} fill className="object-cover" />
                                            ) : displayName ? (
                                                displayName.charAt(0).toUpperCase()
                                            ) : (
                                                <User size={40} />
                                            )}
                                            {saving && (
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                    <Loader2 className="animate-spin text-white" size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <label className="absolute bottom-0 right-0 p-2 bg-primary text-[#1A202C] rounded-full shadow-lg hover:bg-primary/90 transition-colors cursor-pointer">
                                            <Camera size={14} />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={saving} />
                                        </label>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-xl font-bold text-gray-900">{displayName || 'Admin User'}</h3>
                                        <p className="text-gray-500">{user?.email}</p>
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 mt-2 capitalize">
                                            {profile?.role || 'Administrator'}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="displayName">Display Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="displayName"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                className="pl-10 h-11"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="jobTitle">Job Title</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="jobTitle"
                                                value={jobTitle}
                                                onChange={(e) => setJobTitle(e.target.value)}
                                                className="pl-10 h-11"
                                                placeholder="e.g. Lead Manager"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10 h-11"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="pl-10 h-11"
                                                placeholder="+61 400 000 000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button onClick={handleUpdateProfile} disabled={saving} className="gap-2 px-6">
                                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Notification Preferences</h3>
                                    <p className="text-sm text-gray-500">Manage how you receive alerts and updates.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="space-y-0.5">
                                            <Label className="text-base font-bold text-gray-900">Email Notifications</Label>
                                            <p className="text-sm text-gray-500">Receive emails about new leads and updates.</p>
                                        </div>
                                        <Checkbox
                                            checked={emailNotifications}
                                            onCheckedChange={(checked) => setEmailNotifications(checked as boolean)}
                                        />
                                    </div>
                                    {/* Add more notification types here if needed */}
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button onClick={handleUpdateProfile} disabled={saving} className="gap-2 px-6">
                                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                        Save Preferences
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Change Password</h3>
                                </div>

                                <div className="space-y-4 max-w-md">
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="newPassword"
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="pl-10 h-11"
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="pl-10 h-11"
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-start pt-4">
                                    <Button onClick={handleUpdatePassword} disabled={saving} className="gap-2 px-6 bg-red-600 hover:bg-red-700">
                                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Shield size={18} />}
                                        Update Password
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
