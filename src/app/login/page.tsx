'use client';

import { ArrowLeft, Github, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchParams.get("registered") === "true") {
            setSuccessMsg("Registration successful! Please sign in.");
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Store token
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to admin dashboard
            router.push("/admin");
        } catch (err: unknown) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] -z-10 pointer-events-none" />

            <Link href="/" className="absolute top-8 left-8 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> back to home
            </Link>

            <div className="w-full max-w-md p-8 border border-border/50 bg-card/50 backdrop-blur-xl rounded-2xl shadow-2xl relative">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-full mb-4">
                        <User className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-muted-foreground mt-2 text-sm text-center">Enter your credentials to access the admin dashboard</p>
                </div>

                {successMsg && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-md text-green-500 text-sm text-center">
                        {successMsg}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="admin@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                            <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                        </div>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-4 disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline">Sign up</Link>
                        </p>
                    </div>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground relative z-10">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 border border-border/50 bg-background/50 hover:bg-accent rounded-md h-10 text-sm font-medium transition-colors">
                        <Github className="w-4 h-4" /> Github
                    </button>
                    <button className="flex items-center justify-center gap-2 border border-border/50 bg-background/50 hover:bg-accent rounded-md h-10 text-sm font-medium transition-colors">
                        <Mail className="w-4 h-4" /> Google
                    </button>
                </div>
            </div>
        </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background">Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}
