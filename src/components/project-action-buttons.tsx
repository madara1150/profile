"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Loader2 } from "lucide-react";
import Link from "next/link";

interface ProjectActionButtonsProps {
    id: string;
}

export function ProjectActionButtons({ id }: ProjectActionButtonsProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`http://localhost:8080/api/projects/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete project");
            }

            // Refresh the Next.js server component to reflect deletion
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("An error occurred while deleting the project.");
            setIsDeleting(false); // only reset state if failed; if success, it will unmount anyway
        }
    };

    return (
        <div className="flex gap-2">
            <Link
                href={`/admin/projects/${id}/edit`}
                className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-border/50 hover:bg-secondary transition-colors cursor-pointer disabled:opacity-50"
            >
                <Edit2 className="w-3 h-3 mr-1.5" />
                Edit
            </Link>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-destructive/20 text-destructive hover:bg-destructive/10 transition-colors cursor-pointer disabled:opacity-50"
            >
                {isDeleting ? <Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> : <Trash2 className="w-3 h-3 mr-1.5" />}
                Delete
            </button>
        </div>
    );
}
