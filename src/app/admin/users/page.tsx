"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserActionButtons } from "@/components/user-action-buttons";

interface User {
    id: string;
    username: string;
    email: string;
    sex: string;
    firstName: string;
    lastName: string;
    avatar?: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No authentication token found. Please login.");
                }

                const res = await fetch("http://localhost:8080/api/users", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await res.json();
                setUsers(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div className="p-6">Loading users...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground mt-1 text-sm">View and manage system users.</p>
                </div>
                <Link
                    href="/register"
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 font-medium transition-colors hover:bg-primary/90"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add New User
                </Link>
            </div>

            <div className="border border-border/50 rounded-xl bg-card overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border/50 bg-muted/20">
                    <h3 className="font-semibold text-lg">All Registered Users</h3>
                </div>
                <div className="divide-y divide-border/50">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-accent/10 transition-colors">
                                <div>
                                    <h4 className="font-medium text-lg">{user.firstName} {user.lastName}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Username: @{user.username}</p>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                        <span className="bg-secondary px-2 py-0.5 rounded-full">{user.sex || "Unknown"}</span>
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                                <UserActionButtons
                                    id={user.id}
                                    onDeleteSuccess={() => {
                                        setUsers(prev => prev.filter(u => u.id !== user.id));
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                            <p>No users found in the database.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
