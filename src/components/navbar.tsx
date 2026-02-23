"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, User, LogIn } from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/#projects", icon: Briefcase },
    { name: "About", href: "/#about", icon: User },
];

export function Navbar() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("/");

    useEffect(() => {
        // Set initial active tab based on current path and hash
        const hash = window.location.hash;
        if (pathname === "/" && hash) {
            setActiveTab(`/${hash}`);
        } else {
            setActiveTab(pathname);
        }
    }, [pathname]);

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

                <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline-block">Login</span>
                </Link>
            </motion.nav>
        </div>
    );
}
