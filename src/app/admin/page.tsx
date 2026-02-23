import { Plus } from "lucide-react";
import Link from "next/link";
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

async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch("http://localhost:8080/api/projects", { cache: "no-store" });
        if (!res.ok) {
            console.error("Failed to fetch projects");
            return [];
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export default async function AdminDashboard() {
    const projects = await getProjects();

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-sm font-medium text-muted-foreground relative z-10">Total Projects</h3>
                    <p className="text-3xl font-bold mt-2 relative z-10">{projects.length}</p>
                </div>
                <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-sm font-medium text-muted-foreground relative z-10">Views This Month</h3>
                    <p className="text-3xl font-bold mt-2 relative z-10">1,248</p>
                </div>
                <Link href="/admin/projects/new" className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm flex items-center justify-center border-dashed border-2 hover:bg-accent/50 transition-colors cursor-pointer group block">
                    <div className="flex flex-col items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                        <Plus className="w-8 h-8 mb-2" />
                        <span className="font-medium">Add New Project</span>
                    </div>
                </Link>
            </div>

            <div className="border border-border/50 rounded-xl bg-card overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border/50 bg-muted/20">
                    <h3 className="font-semibold text-lg">Recent Projects</h3>
                </div>
                <div className="divide-y divide-border/50">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-accent/10 transition-colors">
                                <div>
                                    <h4 className="font-medium">{project.title}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Location: {project.location || "N/A"}</p>
                                </div>
                                <ProjectActionButtons id={project.id} />
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                            <p>No projects found in the database.</p>
                            <Link href="/admin/projects/new" className="mt-2 text-primary hover:underline text-sm">
                                Create your first project
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
