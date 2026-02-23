import { Plus } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-sm font-medium text-muted-foreground relative z-10">Total Projects</h3>
                    <p className="text-3xl font-bold mt-2 relative z-10">12</p>
                </div>
                <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-sm font-medium text-muted-foreground relative z-10">Views This Month</h3>
                    <p className="text-3xl font-bold mt-2 relative z-10">1,248</p>
                </div>
                <div className="border border-border/50 rounded-xl p-6 bg-card/40 backdrop-blur-sm flex items-center justify-center border-dashed border-2 hover:bg-accent/50 transition-colors cursor-pointer group">
                    <div className="flex flex-col items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                        <Plus className="w-8 h-8 mb-2" />
                        <span className="font-medium">Add New Project</span>
                    </div>
                </div>
            </div>

            <div className="border border-border/50 rounded-xl bg-card/40 backdrop-blur-sm overflow-hidden">
                <div className="p-6 border-b border-border/50">
                    <h3 className="font-semibold text-lg">Recent Projects</h3>
                </div>
                <div className="divide-y divide-border/50">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6 flex items-center justify-between hover:bg-accent/10 transition-colors">
                            <div>
                                <h4 className="font-medium">Project {String.fromCharCode(64 + i)} - Website Design</h4>
                                <p className="text-sm text-muted-foreground mt-1">Updated {i} days ago</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-xs font-medium rounded-md border border-border/50 hover:bg-secondary transition-colors cursor-pointer">Edit</button>
                                <button className="px-3 py-1 text-xs font-medium rounded-md border border-destructive/20 text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
