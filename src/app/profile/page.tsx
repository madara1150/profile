"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User as UserIcon, Mail, Loader2, BadgeCheck } from "lucide-react";
import { AuthGuard } from "@/components/auth-guard";

interface UserProfile {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    emailVerified?: boolean;
}

export default function ProfilePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user profile", e);
            }
        }

        // Check if just returned from successful verification link
        if (searchParams?.get("verified") === "success") {
            setMessage({ type: 'success', text: 'Email successfully verified!' });
            // Update local storage to reflect verified status so UI updates immediately
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                parsed.emailVerified = true;
                localStorage.setItem("user", JSON.stringify(parsed));
                setUser(parsed);
                // Dispatch event so Navbar updates if it depends on it
                window.dispatchEvent(new Event('storage'));
            }
        }
    }, [searchParams]);

    const handleVerifyEmail = async () => {
        if (!user) return;
        setIsVerifying(true);
        setMessage(null);
        setPreviewUrl(null);

        try {
            const res = await fetch("/api/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, email: user.email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send verification email");
            }

            setMessage({ type: 'success', text: 'Verification email sent! Check your inbox.' });
            if (data.previewUrl) {
                setPreviewUrl(data.previewUrl);
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsVerifying(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <AuthGuard>
            <main className="min-h-screen pt-24 pb-16 bg-background">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-xl">
                        {/* Cover Banner */}
                        <div className="h-32 bg-gradient-to-r from-red-900 to-black relative">
                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600 to-transparent"></div>
                        </div>

                        {/* Profile Info */}
                        <div className="px-8 pb-8">
                            <div className="relative flex justify-between items-end -mt-12 mb-6">
                                <div className="w-24 h-24 rounded-full border-4 border-card bg-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                                    {user.avatar ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-10 h-10 text-muted-foreground" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
                                        {user.emailVerified && (
                                            <span title="Verified Account">
                                                <BadgeCheck className="w-6 h-6 text-blue-500 shrink-0" />
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground">@{user.username}</p>
                                </div>

                                <div className="flex flex-col gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Mail className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Email Address</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                        {!user.emailVerified && (
                                            <button
                                                onClick={handleVerifyEmail}
                                                disabled={isVerifying}
                                                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
                                            >
                                                {isVerifying && <Loader2 className="w-4 h-4 animate-spin" />}
                                                Verify Email
                                            </button>
                                        )}
                                    </div>

                                    {message && (
                                        <div className={`p-3 text-sm rounded border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                            {message.text}
                                        </div>
                                    )}

                                    {previewUrl && (
                                        <div className="p-4 bg-muted/50 rounded border border-border">
                                            <p className="text-xs text-muted-foreground mb-2">Since we are using Ethereal Test Email, you can view the sent email here:</p>
                                            <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline break-all">
                                                {previewUrl}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AuthGuard>
    );
}
