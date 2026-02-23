"use client";

import { useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Link as LinkIcon, Download, FileText } from "lucide-react";
import Link from "next/link";
import { projectsData } from "@/data/projects";

export default function ProjectDetail() {
    const params = useParams();
    const id = params.id as string;

    const project = useMemo(() => projectsData.find((p) => p.id === id), [id]);

    if (!project) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-24 pb-32 px-6 lg:px-24">
            <div className="max-w-7xl mx-auto w-full">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Mission Logs
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-red-900/50 flex items-center justify-center text-red-500">
                            {project.icon}
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white drop-shadow-[0_0_10px_rgba(220,38,38,0.3)] mb-2">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 border border-red-900/50 bg-red-950/30 text-red-400 text-sm font-bold rounded uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Carousel */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-300 mb-6 border-l-4 border-red-600 pl-4">
                        Mission Visuals
                    </h2>
                    {project.images && project.images.length > 0 ? (
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-zinc-900">
                            {project.images.map((img, idx) => (
                                <div key={idx} className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                                    {/* Using standard img tag with aspect ratio for simplicity, you could use next/image here */}
                                    <img
                                        src={img}
                                        alt={`${project.title} screenshot ${idx + 1}`}
                                        className="w-full h-[40vh] md:h-[50vh] object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-64 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-gray-500">
                            No visuals available for this mission.
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Details (Left Col) */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-300 mb-6 border-l-4 border-red-600 pl-4">
                                Mission Overview
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {project.desc}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-300 mb-6 border-l-4 border-red-600 pl-4">
                                Classified Documents
                            </h2>
                            {project.files && project.files.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.files.map((file, idx) => (
                                        <a
                                            key={idx}
                                            href={file.url}
                                            download
                                            className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-900 hover:bg-zinc-800/80 transition-all group"
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="p-2 bg-zinc-800 rounded-lg text-gray-400 group-hover:text-red-400 group-hover:bg-red-950/30 transition-colors">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <span className="text-gray-300 font-medium truncate group-hover:text-white transition-colors">{file.name}</span>
                                            </div>
                                            <Download className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors shrink-0" />
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No classified documents attached to this mission.</p>
                            )}
                        </section>
                    </div>

                    {/* Metadata Sidebar (Right Col) */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 space-y-8 sticky top-24">
                            <h3 className="text-xl font-bold uppercase tracking-wide border-b border-zinc-800 pb-4 text-white">
                                Intelligence
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 p-2 bg-zinc-800 rounded-lg text-red-500">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Target Location</p>
                                        <p className="text-gray-200 text-lg">{project.location || "Classified"}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 p-2 bg-zinc-800 rounded-lg text-red-500">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Execution Time</p>
                                        <p className="text-gray-200 text-lg">{project.time || "Classified"}</p>
                                    </div>
                                </div>

                                {project.referenceUrl && (
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 p-2 bg-zinc-800 rounded-lg text-red-500">
                                            <LinkIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Reference Intel</p>
                                            <a
                                                href={project.referenceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-red-400 hover:text-red-300 hover:underline text-lg font-medium break-all"
                                            >
                                                View External Source
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
