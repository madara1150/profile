"use client";

import { Moon, Sun } from "lucide-react";
import { useAdminTheme } from "@/components/admin-theme-provider";

export default function AdminSettingsPage() {
    const { theme, toggleTheme } = useAdminTheme();

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in mt-4 fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground mt-2">Manage your admin dashboard preferences and interface behaviors.</p>
            </div>

            <div className="space-y-6">
                {/* Appearance Section */}
                <section className="border border-border/50 rounded-xl bg-card overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-border/50 bg-muted/20">
                        <h3 className="font-semibold text-lg">Appearance</h3>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h4 className="font-medium text-base">Dark Mode</h4>
                                <p className="text-sm text-muted-foreground">
                                    Switch the admin dashboard between light and dark themes.
                                </p>
                            </div>

                            {/* Custom Toggle Switch */}
                            <button
                                onClick={toggleTheme}
                                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${theme === "dark" ? "bg-primary" : "bg-muted"
                                    }`}
                                aria-pressed={theme === "dark"}
                            >
                                <span className="sr-only">Toggle dark mode</span>
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out flex items-center justify-center ${theme === "dark" ? "translate-x-8" : "translate-x-1"
                                        }`}
                                >
                                    {theme === "dark" ? (
                                        <Moon className="w-3 h-3 text-primary" />
                                    ) : (
                                        <Sun className="w-3 h-3 text-muted-foreground" />
                                    )}
                                </span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
