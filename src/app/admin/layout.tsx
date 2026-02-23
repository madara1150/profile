'use client';

import { Briefcase, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AuthGuard } from "@/components/auth-guard";
import { AdminThemeProvider } from "@/components/admin-theme-provider";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname === "/admin") return "Dashboard Overview";
        if (pathname.startsWith("/admin/users")) return "User Management";
        if (pathname.startsWith("/admin/projects")) return "Project Portfolio";
        if (pathname.startsWith("/admin/settings")) return "System Settings";
        return "Admin Area";
    };

    return (
        <AuthGuard>
            <AdminThemeProvider>
                <div className="min-h-screen bg-background flex text-foreground">
                    {/* Sidebar */}
                    <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl flex-col hidden md:flex">
                        <div className="h-16 flex items-center px-6 border-b border-border/50">
                            <Link href="/admin" className="font-bold text-lg tracking-tight">Admin<span className="text-primary">Panel</span></Link>
                        </div>
                        <nav className="flex-1 p-4 flex flex-col gap-2">
                            <Link
                                href="/admin"
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors",
                                    pathname === "/admin"
                                        ? "bg-secondary/80 text-secondary-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                )}
                            >
                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                            </Link>
                            <Link
                                href="/admin/users"
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors",
                                    pathname.startsWith("/admin/users")
                                        ? "bg-secondary/80 text-secondary-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                )}
                            >
                                <Users className="w-4 h-4" /> Users
                            </Link>
                            <Link
                                href="/admin/projects"
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors",
                                    pathname.startsWith("/admin/projects")
                                        ? "bg-secondary/80 text-secondary-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                )}
                            >
                                <Briefcase className="w-4 h-4" /> Projects
                            </Link>
                            <Link
                                href="/admin/settings"
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors",
                                    pathname.startsWith("/admin/settings")
                                        ? "bg-secondary/80 text-secondary-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                )}
                            >
                                <Settings className="w-4 h-4" /> Settings
                            </Link>
                        </nav>
                        <div className="p-4 border-t border-border/50">
                            <Link href="/login" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive font-medium transition-colors">
                                <LogOut className="w-4 h-4" /> Logout
                            </Link>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                        <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-10 transition-colors">
                            <h1 className="font-semibold text-lg">{getPageTitle()}</h1>
                        </header>
                        <div className="flex-1 overflow-auto p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </AdminThemeProvider>
        </AuthGuard>
    );
}
