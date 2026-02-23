import { Briefcase, LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-border/50">
                    <Link href="/admin" className="font-bold text-lg tracking-tight">Admin<span className="text-primary">Panel</span></Link>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md bg-secondary/80 text-secondary-foreground font-medium transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground font-medium transition-colors">
                        <Briefcase className="w-4 h-4" /> Projects
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground font-medium transition-colors">
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
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 bg-background/80 backdrop-blur-md">
                    <h1 className="font-semibold text-lg">Dashboard Overview</h1>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">A</span>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
