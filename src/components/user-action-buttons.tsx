"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Loader2 } from "lucide-react";
import Link from "next/link";

interface UserActionButtonsProps {
    id: string;
    onDeleteSuccess?: () => void;
}

export function UserActionButtons({ id, onDeleteSuccess }: UserActionButtonsProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        setIsDeleting(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete user");
            }

            if (onDeleteSuccess) {
                onDeleteSuccess();
            } else {
                // Fallback for cases where it's not a stateful list
                router.refresh();
            }
        } catch (error: unknown) {
            console.error(error);
            alert("An error occurred while deleting the user: " + (error as Error).message);
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex gap-2">
            <Link
                href={`/admin/users/${id}/edit`}
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
