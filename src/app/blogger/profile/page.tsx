"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Save, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase";

export default function BloggerProfilePage() {
    const { user } = useAuth();
    const supabase = createClient();

    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState("");
    const [profileError, setProfileError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [profileData, setProfileData] = useState({
        name: user?.user_metadata?.name || "",
        bio: user?.user_metadata?.bio || "",
    });

    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleProfileSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setProfileLoading(true);
        setProfileSuccess("");
        setProfileError("");

        try {
            const response = await fetch(`/api/bloggers/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: profileData.name,
                    bio: profileData.bio,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setProfileSuccess("Profile updated successfully!");
            } else {
                setProfileError(data.error || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setProfileError('An error occurred. Please try again.');
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordSuccess("");
        setPasswordError("");

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }

        setPasswordLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: passwordData.newPassword,
            });

            if (error) {
                setPasswordError(error.message || 'Failed to change password');
            } else {
                setPasswordSuccess("Password changed successfully!");
                setPasswordData({ newPassword: "", confirmPassword: "" });
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordError('An error occurred. Please try again.');
        } finally {
            setPasswordLoading(false);
        }
    };

    const displayName = user?.user_metadata?.name || user?.email || 'Blogger';
    const initials = displayName.substring(0, 2).toUpperCase();

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 font-heading">
                    Profile <span className="text-primary">Settings</span>
                </h1>
                <p className="text-gray-500 font-medium mt-1">Manage your blogger profile and account settings</p>
            </div>

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 rounded-[2rem] space-y-6"
            >
                <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-lg shadow-primary/20 flex-shrink-0">
                        <div className="h-full w-full rounded-[22px] bg-white flex items-center justify-center">
                            <span className="font-heading text-2xl font-bold text-primary">{initials}</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                        <span className="inline-flex mt-1 px-3 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                            Blogger
                        </span>
                    </div>
                </div>

                <div className="h-px bg-gray-100" />

                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <User size={20} className="text-primary" />
                    Edit Profile
                </h3>

                {profileSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
                    >
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{profileSuccess}</p>
                    </motion.div>
                )}

                {profileError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                    >
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{profileError}</p>
                    </motion.div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
                        <Input
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            placeholder="Your display name"
                            className="h-12"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <Input
                            value={user?.email || ""}
                            disabled
                            className="h-12 bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed from this page</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                        <Textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            placeholder="Tell us a bit about yourself..."
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={profileLoading || !profileData.name}
                        className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                        {profileLoading ? (
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Save size={18} />
                        )}
                        Save Profile
                    </Button>
                </form>
            </motion.div>

            {/* Change Password Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 rounded-[2rem] space-y-6"
            >
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Lock size={20} className="text-primary" />
                    Change Password
                </h3>

                {passwordSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
                    >
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{passwordSuccess}</p>
                    </motion.div>
                )}

                {passwordError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                    >
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{passwordError}</p>
                    </motion.div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                            <Input
                                type={showNewPassword ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                placeholder="New password"
                                className="h-12 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                placeholder="Confirm new password"
                                className="h-12 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={passwordLoading || !passwordData.newPassword || !passwordData.confirmPassword}
                        variant="outline"
                        className="gap-2"
                    >
                        {passwordLoading ? (
                            <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Lock size={18} />
                        )}
                        Change Password
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
