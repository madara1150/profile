"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface AdminThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load preference from local storage on mount
        const savedTheme = localStorage.getItem("admin-theme") as Theme;
        if (savedTheme === "dark" || savedTheme === "light") {
            setTheme(savedTheme);
        } else {
            // Default to dark mode based on global UI aesthetics, or system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDark ? "dark" : "light");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("admin-theme", newTheme);
    };

    // We must ALWAYS wrap children in the provider so hooks don't throw errors
    // during SSR or initial hydration. We just conditionally apply the dark classes.
    return (
        <AdminThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`min-h-screen transition-colors duration-300 ${mounted && theme === "dark" ? "dark bg-background text-foreground" : "bg-background text-foreground"}`}>
                {children}
            </div>
        </AdminThemeContext.Provider>
    );
}

export function useAdminTheme() {
    const context = useContext(AdminThemeContext);
    if (!context) {
        throw new Error("useAdminTheme must be used within an AdminThemeProvider");
    }
    return context;
}
