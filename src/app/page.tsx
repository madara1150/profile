"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Flame, Loader2 } from "lucide-react";
import { Sharingan } from "@/components/ui/sharingan";
import { ProjectCard } from "@/components/project-card";

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

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Track scroll progress within the intro container
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"]
  });

  // Background color interpolation: from Light Theme to Dark Theme
  const backgroundColor = useTransform(introProgress, [0, 0.3, 0.6], ["#fafafa", "#3f0a0a", "#000000"]);

  // Hero section fades out and moves up as you scroll down
  const heroOpacity = useTransform(introProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(introProgress, [0, 0.25], ["0%", "-50%"]);
  const heroPointerEvents = useTransform(introProgress, (v) => v > 0.25 ? "none" : "auto");

  // Sharingan eye scale and rotation effect (Genjutsu Transition)
  // It starts normal, scales up massively in the middle, then fades out
  const sharinganScale = useTransform(introProgress, [0, 0.2, 0.6], [1, 1.2, 40]);
  const sharinganRotate = useTransform(introProgress, [0, 0.6], [0, 720]);
  const sharinganOpacity = useTransform(introProgress, [0, 0.5, 0.6], [1, 1, 0]);

  return (
    <motion.main
      className="w-full relative selection:bg-red-600 selection:text-white"
      style={{ backgroundColor }}
    >
      {/* Scrollable area for the intro animation (200vh sticky phase) */}
      <div ref={introRef} className="h-[300vh] relative w-full">
        {/* Sticky Container for the visual experience */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* === HERO SECTION (Visible at top) === */}
          <motion.section
            className="absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-12"
            style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointerEvents as any }}
          >
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 h-full">
              {/* Left Content */}
              <div className="flex-1 space-y-8 z-10 pt-24 md:pt-0">
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                  <Flame className="w-4 h-4 mr-2 animate-pulse" />
                  Uchiha Clan Developer
                </div>

                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
                  Awaken
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-primary drop-shadow-sm">
                    The Code
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground font-medium max-w-md border-l-4 border-primary pl-4">
                  Mastering the dark arts of Next.js and Golang. Scroll down to break the illusion.
                </p>
              </div>

              {/* Right Side Placeholder for layout balance */}
              <div className="flex-1 hidden md:block" />
            </div>

            <motion.div
              className="absolute bottom-12 flex flex-col items-center text-muted-foreground gap-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Keep Scrolling</span>
              <ArrowDown className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.section>

          {/* === SHARINGAN GENJUTSU TRANSITION === */}
          {/* Positioned on the right initially, but moves/scales relative to the center during scroll */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-end pointer-events-none px-6 lg:px-24">
            <motion.div
              className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center origin-center md:origin-right"
              style={{
                scale: sharinganScale,
                rotate: sharinganRotate,
                opacity: sharinganOpacity
              }}
            >
              {/* Decorative background circles */}
              <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-red-600/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <Sharingan className="w-[80%] h-[80%]" isSpinning={false} />
            </motion.div>
          </div>

        </div>
      </div>

      {/* === PROJECTS SECTION (Normal Document Flow) === */}
      {/* Revealed naturally as scroll continues past the intro section */}
      <section id="projects" className="relative z-10 w-full bg-black px-6 lg:px-24 text-white min-h-screen pt-24 pb-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-white drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">Mission Logs</h2>
            <div className="w-32 h-1 bg-red-600 mb-6 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
            <p className="text-xl text-gray-400 max-w-2xl font-medium">Bounties completed and systems architected from the shadows.</p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-red-500">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="text-xl font-bold animate-pulse">Accessing Secret Archives...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  icon={project.images && project.images.length > 0 ? project.images[0] : "/icons/default.svg"}
                  title={project.title}
                  desc={project.desc}
                  tags={project.tags || []}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No mission logs found. The database is empty.</p>
            </div>
          )}
        </div>
      </section>
    </motion.main>
  );
}
