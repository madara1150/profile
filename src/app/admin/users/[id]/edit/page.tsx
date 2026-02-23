"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, User as UserIcon, Loader2, ImagePlus, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function EditUserPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        sex: "Male",
        avatar: "",
    });
    const [originalUsername, setOriginalUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Authentication required");

                const res = await fetch(`http://localhost:8080/api/users/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!res.ok) throw new Error("Failed to fetch user data");

                const data = await res.json();
                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    sex: data.sex || "Male",
                    avatar: data.avatar || "",
                });
                setOriginalUsername(data.username);
            } catch (err: unknown) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);
        setError("");

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("http://localhost:8080/api/upload/image", {
                method: "POST",
                body: uploadData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to upload image");
            }

            const data = await res.json();
            setFormData(prev => ({ ...prev, avatar: data.url }));
        } catch (err: unknown) {
            setError((err as Error).message || "Failed to upload avatar.");
        } finally {
            setIsUploadingImage(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const removeAvatar = () => {
        setFormData(prev => ({ ...prev, avatar: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setSaving(true);

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to update user");
            }

            // If editing the currently logged-in user, update localStorage so Navbar reflects it immediately.
            try {
                const loggedInUserStr = localStorage.getItem("user");
                if (loggedInUserStr) {
                    const loggedInUser = JSON.parse(loggedInUserStr);
                    if (loggedInUser.id === id) {
                        const updatedUser = {
                            ...loggedInUser,
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            avatar: formData.avatar
                        };
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                        // Dispatch event to trick Navbar into re-rendering if needed
                        window.dispatchEvent(new Event("storage"));
                    }
                }
            } catch {
                console.error("Failed to sync localStorage for user update");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/users");
                router.refresh();
            }, 1000);
        } catch (err: unknown) {
            setError((err as Error).message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-6">Loading user details...</div>;
    if (error && !originalUsername) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/users"
                    className="p-2 border border-border/50 rounded-md hover:bg-accent/50 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Edit User</h2>
                    <p className="text-muted-foreground text-sm">Update details for @{originalUsername}</p>
                </div>
            </div>

            <div className="border border-border/50 rounded-xl bg-card p-6 shadow-sm relative">
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative group w-20 h-20 bg-primary/20 flex items-center justify-center rounded-full text-primary border border-primary/30 overflow-hidden shrink-0">
                        {formData.avatar ? (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <button
                                        type="button"
                                        onClick={removeAvatar}
                                        className="p-1.5 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform focus:outline-none"
                                        title="Remove Avatar"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <UserIcon className="w-8 h-8" />
                        )}
                        {/* Always show upload overlay if no avatar, or replace button if needed. Since we have a remove button above, here we just show the base logic. */}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h3>
                        <p className="text-muted-foreground text-sm">ID: {id}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <label className={`inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors ${isUploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isUploadingImage ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
                        ) : (
                            <><ImagePlus className="w-4 h-4 mr-2" /> {formData.avatar ? "Change Avatar" : "Upload Avatar"}</>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            disabled={isUploadingImage}
                        />
                    </label>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-md text-red-500 text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-md text-green-500 text-sm">
                        User updated successfully! Redirecting...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background disabled:opacity-50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background disabled:opacity-50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background disabled:opacity-50 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="sex">Sex</label>
                        <select
                            id="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background transition-colors"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex justify-end gap-4">
                        <Link
                            href="/admin/users"
                            className="px-4 py-2 rounded-md border border-border/50 hover:bg-secondary font-medium text-sm transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50"
                        >
                            {saving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
