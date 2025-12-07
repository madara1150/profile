import React from 'react'
import { Code, Trophy, Star, Award } from 'lucide-react'

export interface Project {
  id?: string
  title: string
  role?: string
  hours?: number
  lastPlayed?: string
  achievementCount?: number
  totalAchievements?: number
  image: string
  tags?: string[]
}

export interface Friend {
  id: number
  name: string
  status: string
  level: number
  avatarColor: string
}

export const profile = {
  name: 'Tanathip Singhanon',
  location: 'Bangkok, Thailand',
  level: 24,
  summary: 'Full Stack Developer. Building digital experiences that matter. Obsessed with clean code and pixel-perfect UI.',
  status: 'Online',
  statusText: 'Currently coding in VS Code',
}

export const featuredProjects: Array<Project & { progress?: number; total?: number; label?: string }> = [
  {
    title: 'E-Commerce Platform',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80',
    progress: 520,
    total: 520,
    label: 'React & Node.js',
  },
  {
    title: 'Task Management App',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=600&q=80',
    progress: 101,
    total: 101,
    label: 'TypeScript System',
  },
]

export const recentActivity: Project[] = [
  {
    id: '1',
    title: 'FinTech Dashboard',
    role: 'Lead Frontend',
    hours: 352,
    lastPlayed: '2 weeks ago',
    achievementCount: 52,
    totalAchievements: 52,
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=600&q=80',
    tags: ['React', 'D3.js', 'AWS'],
  },
  {
    id: '2',
    title: 'Social Media API',
    role: 'Backend Architect',
    hours: 893,
    lastPlayed: 'Last logged today',
    achievementCount: 30,
    totalAchievements: 45,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    tags: ['Node.js', 'GraphQL', 'Redis'],
  },
  {
    id: '3',
    title: 'AI Image Generator',
    role: 'Full Stack',
    hours: 84,
    lastPlayed: 'Nov 26',
    achievementCount: 27,
    totalAchievements: 320,
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80',
    tags: ['Python', 'TensorFlow', 'React'],
  },
]

export const friends: Friend[] = [
  { id: 1, name: 'Sarah Design', status: 'Online', level: 50, avatarColor: 'bg-purple-500' },
  { id: 2, name: 'Mike Manager', status: 'Away', level: 32, avatarColor: 'bg-blue-500' },
  { id: 3, name: 'Jessica QA', status: 'In-Game', level: 19, avatarColor: 'bg-green-500' },
  { id: 4, name: 'Tom DevOps', status: 'Offline', level: 41, avatarColor: 'bg-red-500' },
  { id: 5, name: 'Client A', status: 'Online', level: 12, avatarColor: 'bg-yellow-500' },
  { id: 6, name: 'Recruiter B', status: 'Mobile', level: 8, avatarColor: 'bg-indigo-500' },
]

export const badges = [
  { id: 1, icon: <Code size={18} />, name: 'Polyglot', level: '500 XP' },
  { id: 2, icon: <Trophy size={18} />, name: 'Top Rated', level: '100 XP' },
  { id: 3, icon: <Star size={18} />, name: 'Rising Star', level: '25+ Projects' },
  { id: 4, icon: <Award size={18} />, name: 'Certified', level: 'AWS Pro' },
]
