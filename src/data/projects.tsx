import { Layout, Server, Database, Code, Shield, Smartphone, Globe, Cpu, Cloud, Zap } from "lucide-react";
import React from "react";

export interface Project {
    id: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
    tags: string[];
    images: string[];
    location: string;
    time: string;
    referenceUrl: string;
    files: { name: string; url: string }[];
}

export const projectsData: Project[] = [
    {
        id: "p1",
        icon: <Layout />,
        title: "S-Rank E-Commerce",
        desc: "A highly optimized full-stack storefront featuring 3D product configurators.",
        tags: ["Next.js", "Three.js", "Tailwind"],
        images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"],
        location: "Konohagakure",
        time: "Q3 2023",
        referenceUrl: "https://example.com/s-rank-ecommerce",
        files: [{ name: "Architecture Diagram.pdf", url: "#" }, { name: "API Spec.md", url: "#" }]
    },
    {
        id: "p2",
        icon: <Server />,
        title: "Chakra Analytics",
        desc: "Blazing fast real-time dashboard powered by WebSockets.",
        tags: ["Golang", "React", "PostgreSQL"],
        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"],
        location: "Sunagakure",
        time: "Q4 2023",
        referenceUrl: "https://example.com/chakra-analytics",
        files: [{ name: "Database Schema.sql", url: "#" }]
    },
    {
        id: "p3",
        icon: <Database />,
        title: "Shadow Clone CMS",
        desc: "A headless CMS framework built to scale content delivery flawlessly.",
        tags: ["Go Fiber", "Redis", "Docker"],
        images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000"],
        location: "Kirigakure",
        time: "Q1 2024",
        referenceUrl: "https://example.com/shadow-clone-cms",
        files: [{ name: "Deployment Guide.pdf", url: "#" }, { name: "Docker Config.zip", url: "#" }]
    },
    {
        id: "p4",
        icon: <Code />,
        title: "Kusanagi API",
        desc: "High-performance GraphQL API built for modern frontend architectures.",
        tags: ["Node.js", "GraphQL", "TypeScript"],
        images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000"],
        location: "Otogakure",
        time: "Q2 2024",
        referenceUrl: "https://example.com/kusanagi-api",
        files: [{ name: "GraphQL Schema.graphql", url: "#" }]
    },
    {
        id: "p5",
        icon: <Shield />,
        title: "ANBU Security",
        desc: "Zero-trust identity management and authentication provider.",
        tags: ["Rust", "OAuth2", "WebAuthn"],
        images: ["https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2000"],
        location: "Konohagakure",
        time: "Q2 2024",
        referenceUrl: "https://example.com/anbu-security",
        files: [{ name: "Security Audit.pdf", url: "#" }, { name: "Threat Model.docx", url: "#" }]
    },
    {
        id: "p6",
        icon: <Smartphone />,
        title: "Ninja Tools App",
        desc: "Cross-platform mobile application for tracking field operations.",
        tags: ["React Native", "Expo", "Firebase"],
        images: ["https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2000"],
        location: "Global",
        time: "Q3 2024",
        referenceUrl: "https://example.com/ninja-tools-app",
        files: [{ name: "App Store Assets.zip", url: "#" }]
    },
    {
        id: "p7",
        icon: <Globe />,
        title: "Village Network",
        desc: "Decentralized social networking protocol and web client.",
        tags: ["Web3", "Solidity", "Next.js"],
        images: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"],
        location: "Kumogakure",
        time: "Q4 2024",
        referenceUrl: "https://example.com/village-network",
        files: [{ name: "Whitepaper.pdf", url: "#" }, { name: "Smart Contracts.zip", url: "#" }]
    },
    {
        id: "p8",
        icon: <Cpu />,
        title: "Sage Mode AI",
        desc: "Machine learning platform for predictive analytics and natural language processing.",
        tags: ["Python", "TensorFlow", "FastAPI"],
        images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000"],
        location: "Toad Mountain",
        time: "Q1 2025",
        referenceUrl: "https://example.com/sage-mode-ai",
        files: [{ name: "Model Weights.h5", url: "#" }, { name: "Dataset Specs.csv", url: "#" }]
    },
    {
        id: "p9",
        icon: <Cloud />,
        title: "Akatsuki Cloud",
        desc: "Serverless function orchestration platform with edge deployment.",
        tags: ["AWS", "Kubernetes", "Terraform"],
        images: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2000"],
        location: "Amegakure",
        time: "Q2 2025",
        referenceUrl: "https://example.com/akatsuki-cloud",
        files: [{ name: "Architecture Diagram.png", url: "#" }, { name: "Terraform Docs.md", url: "#" }]
    },
    {
        id: "p10",
        icon: <Zap />,
        title: "Raikiri Engine",
        desc: "Ultra-low latency trading bot and algorithm testing environment.",
        tags: ["C++", "HFT", "Linux"],
        images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2000"],
        location: "Kumogakure",
        time: "Q3 2025",
        referenceUrl: "https://example.com/raikiri-engine",
        files: [{ name: "Latency Tests.pdf", url: "#" }]
    }
];
