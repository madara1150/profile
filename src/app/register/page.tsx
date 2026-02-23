'use client';

import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        sex: "Male",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            // Registration successful, redirect to login
            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.message);
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

            <div className="w-full max-w-md p-8 border border-border/50 bg-card/50 backdrop-blur-xl rounded-2xl shadow-2xl relative mt-12 mb-12">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-full mb-4">
                        <UserPlus className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
                    <p className="text-muted-foreground mt-2 text-sm text-center">Join the Uchiha Clan Developer network</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Itachi"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Uchiha"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="itachi_u"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="itachi@uchiha.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="sex">Sex</label>
                        <select
                            id="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-6 disabled:opacity-50"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-muted-foreground">
                            Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}
