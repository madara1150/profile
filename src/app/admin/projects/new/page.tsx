"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus, X, ImagePlus } from "lucide-react";
import Link from "next/link";

interface ProjectFile {
    name: string;
    url: string;
}

interface ProjectForm {
    title: string;
    desc: string;
    location: string;
    time: string;
    referenceUrl: string;
    tags: string[];
    images: string[];
    files: ProjectFile[];
}

export default function NewProjectPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentTag, setCurrentTag] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState<ProjectForm>({
        title: "",
        desc: "",
        location: "",
        time: "",
        referenceUrl: "",
        tags: [],
        images: [],
        files: [],
    });

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && currentTag.trim() !== "") {
            e.preventDefault();
            if (!form.tags.includes(currentTag.trim())) {
                setForm({ ...form, tags: [...form.tags, currentTag.trim()] });
            }
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setForm({ ...form, tags: form.tags.filter(tag => tag !== tagToRemove) });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:8080/api/upload/image", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to upload image");
            }

            const data = await res.json();
            setForm(prev => ({ ...prev, images: [...prev.images, data.url] }));
        } catch (err: unknown) {
            setError((err as Error).message || "Failed to upload image.");
        } finally {
            setIsUploadingImage(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // reset input
            }
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setForm({ ...form, images: form.images.filter((_, index) => index !== indexToRemove) });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8080/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create project");
            }

            // Success, navigate back to admin
            router.push("/admin");
            router.refresh();
        } catch (err: unknown) {
            setError((err as Error).message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500 relative">
            <Link href="/admin" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
            </Link>

            <div className="border border-border/50 rounded-xl bg-card overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border/50 bg-muted/20">
                    <h2 className="text-2xl font-bold">Create New Project</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Fill in the details below to add a new project to your portfolio.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {error && (
                        <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">Project Title <span className="text-destructive">*</span></label>
                            <input
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. S-Rank E-Commerce"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-medium">Location</label>
                            <input
                                id="location"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. Konohagakure"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="desc" className="text-sm font-medium">Description <span className="text-destructive">*</span></label>
                            <textarea
                                id="desc"
                                name="desc"
                                value={form.desc}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                placeholder="Briefly describe the project..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="time" className="text-sm font-medium">Time / Period</label>
                            <input
                                id="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. Q3 2023"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="referenceUrl" className="text-sm font-medium">Reference URL</label>
                            <input
                                id="referenceUrl"
                                name="referenceUrl"
                                value={form.referenceUrl}
                                onChange={handleChange}
                                type="url"
                                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">Tags</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {form.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary/20 transition-colors focus:outline-none"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <input
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Type a tag and press Enter"
                                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">Mission Visuals</label>
                            {form.images.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
                                    {form.images.map((img, index) => (
                                        <div key={index} className="relative group rounded-md overflow-hidden border border-border/50 aspect-video bg-zinc-900">
                                            <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="p-2 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <label className={`flex h-10 w-full md:w-auto cursor-pointer items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors ${isUploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {isUploadingImage ? (
                                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
                                    ) : (
                                        <><ImagePlus className="w-4 h-4 mr-2" /> Upload Image</>
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
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border/50">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors mr-4"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Project
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
