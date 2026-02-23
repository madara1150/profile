import React from "react";
import Link from "next/link";

export interface ProjectCardProps {
    id: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
    tags: string[];
}

export function ProjectCard({ id, icon, title, desc, tags }: ProjectCardProps) {
    return (
        <Link href={`/project/${id}`} className="group rounded-xl bg-zinc-900/80 border border-red-900/30 hover:border-red-600/80 overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] flex flex-col cursor-pointer block">
            <div className="h-48 bg-black flex items-center justify-center group-hover:bg-red-950/30 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600 to-transparent scale-150 group-hover:scale-100 transition-transform duration-700" />
                <div className="[&>svg]:w-16 [&>svg]:h-16 [&>svg]:text-red-500 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all z-10">
                    {icon}
                </div>
            </div>
            <div className="p-8 flex-1 flex flex-col relative z-10 bg-zinc-900/50 backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide text-white">{title}</h3>
                <p className="text-gray-400 flex-1 leading-relaxed">{desc}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 box-border border border-red-900/50 bg-red-950/30 text-red-400 text-xs font-bold rounded uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
