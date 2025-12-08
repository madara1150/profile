"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            if (!res.ok) {
                throw new Error("Login failed");
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            router.push("/"); // Redirect to home on success
        } catch (err) {
            setError("Failed to login. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4 text-white">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
                <h1 className="mb-6 text-center text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Welcome Back
                </h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-400">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 p-3 font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
