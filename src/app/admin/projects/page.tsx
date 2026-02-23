"use client";

import { useEffect, useState, useMemo } from "react";
import { Plus, FolderKanban, Tags as TagsIcon, Activity } from "lucide-react";
import Link from "next/link";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { format, parseISO, isValid } from 'date-fns';
import { ProjectActionButtons } from "@/components/project-action-buttons";

interface ProjectFile {
    name: string;
    url: string;
}

interface Project {
    id: string;
    title: string;
    desc: string;
    location: string;
    time: string;
    referenceUrl: string;
    tags: string[];
    images: string[];
    files: ProjectFile[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#6366f1'];

export default function ProjectsDashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/projects", { cache: "no-store" });
                if (!res.ok) {
                    throw new Error("Failed to fetch projects");
                }
                const data = await res.json();
                setProjects(data);
            } catch (error: any) {
                console.error("Error fetching projects:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Process Data for Charts using useMemo to prevent re-renders and lag
    const creationData = useMemo(() => {
        const counts: Record<string, number> = {};
        projects.forEach(p => {
            // Attempt to parse the time. If it fails or is missing, use "Unknown"
            let monthYear = "Unknown Date";
            if (p.time) {
                try {
                    // Try parsing as ISO first, fallback to standard Date
                    const d = new Date(p.time);
                    if (!isNaN(d.getTime())) {
                        monthYear = format(d, 'MMM yyyy');
                    }
                } catch {
                    // ignore and use default
                }
            }
            if (!counts[monthYear]) counts[monthYear] = 0;
            counts[monthYear]++;
        });

        return Object.entries(counts).map(([name, count]) => ({
            name,
            count
        })).sort((a, b) => {
            if (a.name === "Unknown Date") return 1;
            if (b.name === "Unknown Date") return -1;
            return new Date(a.name).getTime() - new Date(b.name).getTime();
        });
    }, [projects]);

    const tagsData = useMemo(() => {
        const counts: Record<string, number> = {};
        projects.forEach(p => {
            if (p.tags && p.tags.length > 0) {
                p.tags.forEach(t => {
                    const tag = t.trim();
                    if (!counts[tag]) counts[tag] = 0;
                    counts[tag]++;
                });
            } else {
                if (!counts["Uncategorized"]) counts["Uncategorized"] = 0;
                counts["Uncategorized"]++;
            }
        });

        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value); // Sort by highest
    }, [projects]);

    if (loading) return <div className="p-6">Loading dashboard...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    const uniqueTagsCount = Object.keys(tagsData).length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Projects Dashboard</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Analytics and management for your portfolio.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 font-medium transition-colors hover:bg-primary/90 shadow-sm"
                >
                    <Plus className="w-4 h-4 mr-2" /> New Project
                </Link>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Total Projects</h3>
                            <p className="text-3xl font-bold mt-2">{projects.length}</p>
                        </div>
                        <div className="p-3 bg-blue-500/20 text-blue-500 rounded-xl">
                            <FolderKanban className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Unique Tags</h3>
                            <p className="text-3xl font-bold mt-2">{uniqueTagsCount}</p>
                        </div>
                        <div className="p-3 bg-purple-500/20 text-purple-500 rounded-xl">
                            <TagsIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Recent Activity</h3>
                            <p className="text-3xl font-bold mt-2">{creationData.length > 0 ? creationData[creationData.length - 1]?.count : 0} <span className="text-sm font-normal text-muted-foreground">latest</span></p>
                        </div>
                        <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-xl">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            {projects.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar Chart: Projects over time */}
                    <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm shadow-sm">
                        <h3 className="font-semibold text-lg mb-6">Projects Creation Trend</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={creationData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#888888' }} axisLine={false} tickLine={false} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#888888' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Projects" animationDuration={1000} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Donut Chart: Projects by tags */}
                    <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm shadow-sm flex flex-col">
                        <h3 className="font-semibold text-lg mb-6">Projects by Tags</h3>
                        <div className="h-72 w-full flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={tagsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                        animationDuration={1000}
                                    >
                                        {tagsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Project List */}
            <div className="border border-border/50 rounded-xl bg-card overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border/50 bg-muted/20">
                    <h3 className="font-semibold text-lg">All Projects List</h3>
                </div>
                <div className="divide-y divide-border/50">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-accent/10 transition-colors">
                                <div>
                                    <h4 className="font-medium text-lg">{project.title}</h4>
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{project.desc}</p>
                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        {project.tags && project.tags.map((tag, idx) => (
                                            <span key={idx} className="bg-secondary/80 text-secondary-foreground text-xs px-2.5 py-1 rounded-full border border-border/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:ml-auto">
                                    <ProjectActionButtons
                                        id={project.id}
                                        onDeleteSuccess={() => {
                                            setProjects(prev => prev.filter(p => p.id !== project.id));
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                            <p>No projects found in the database.</p>
                            <Link href="/admin/projects/new" className="mt-4 text-primary font-medium hover:underline text-sm">
                                Create your first project
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
