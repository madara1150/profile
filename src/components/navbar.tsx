"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, User, LogIn, Settings, LogOut, ChevronDown } from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/#projects", icon: Briefcase },
    { name: "About", href: "/#about", icon: User },
    { name: "Admin", href: "/admin", icon: Settings },
];

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("/");
    const [user, setUser] = useState<{ id: string, username: string, firstName: string, lastName: string, avatar: string, email: string } | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Initial hydration of user state and event listener
    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch {
                    console.error("Failed to parse user from local storage");
                }
            } else {
                setUser(null);
            }
        };

        loadUser();
        window.addEventListener("storage", loadUser);

        const hash = window.location.hash;
        if (pathname === "/" && hash) {
            setActiveTab(`/${hash}`);
        } else {
            setActiveTab(pathname);
        }

        return () => window.removeEventListener("storage", loadUser);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsDropdownOpen(false);
        router.push("/");
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setActiveTab(href);
        if (pathname === "/") {
            if (href.startsWith("/#")) {
                const targetId = href.replace("/#", "");
                const elem = document.getElementById(targetId);
                if (elem) {
                    e.preventDefault();
                    elem.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", href);
                }
            } else if (href === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
            }
        }
    };

    return (
        <div className="fixed top-4 inset-x-0 w-full z-50 flex justify-center px-4">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-background/50 backdrop-blur-md shadow-lg"
            >
                {navItems.map((item) => {
                    const isActive = activeTab === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleScroll(e, item.href)}
                            className={`relative flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute flex-1 inset-0 rounded-full bg-secondary/80 -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline-block">{item.name}</span>
                        </Link>
                    );
                })}

                <div className="w-px h-6 bg-border mx-2" />

                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-secondary/50 transition-colors focus:outline-none"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm overflow-hidden border border-primary/20">
                                {user.avatar ? (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    </>
                                ) : (
                                    user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"
                                )}
                            </div>
                            <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-12 right-0 w-48 bg-card border border-border/50 rounded-xl shadow-xl overflow-hidden py-2 backdrop-blur-xl">
                                <div className="px-4 py-2 border-b border-border/50 mb-2">
                                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                                    <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                                </div>
                                <Link
                                    href="/admin"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50 transition-colors"
                                >
                                    <Settings className="w-4 h-4" /> Admin Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        <LogIn className="w-4 h-4" />
                        <span className="hidden sm:inline-block">Login</span>
                    </Link>
                )}
            </motion.nav>
        </div>
    );
}
