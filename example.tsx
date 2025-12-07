import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  Users, 
  MessageSquare, 
  Gamepad2, 
  Monitor, 
  Code, 
  Globe, 
  Github, 
  Linkedin, 
  Mail,
  MapPin,
  Clock,
  Award,
  ChevronDown,
  Search
} from 'lucide-react';

// --- Types & Interfaces ---
interface Project {
  id: string;
  title: string;
  role: string;
  hours: number; // Represents hours worked or lines of code, for flavor
  lastPlayed: string; // Represents "Last Updated"
  achievementCount: number; // Represents completed tasks/features
  totalAchievements: number;
  image: string;
  tags: string[];
}

interface Friend {
  id: number;
  name: string;
  status: string;
  level: number;
  avatarColor: string;
}

// --- Main Application Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock Data mimicking a portfolio structure
  const profile = {
    name: "Alex Dev",
    location: "San Francisco, CA",
    level: 24, // Age or Years of Exp * 10
    summary: "Full Stack Developer. Building digital experiences that matter. Obsessed with clean code and pixel-perfect UI.",
    status: "Online",
    statusText: "Currently coding in VS Code",
  };

  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80",
      progress: 520,
      total: 520,
      label: "React & Node.js"
    },
    {
      title: "Task Management App",
      image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=600&q=80",
      progress: 101,
      total: 101,
      label: "TypeScript System"
    }
  ];

  const recentActivity: Project[] = [
    {
      id: "1",
      title: "FinTech Dashboard",
      role: "Lead Frontend",
      hours: 352,
      lastPlayed: "2 weeks ago",
      achievementCount: 52,
      totalAchievements: 52,
      image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=600&q=80",
      tags: ["React", "D3.js", "AWS"]
    },
    {
      id: "2",
      title: "Social Media API",
      role: "Backend Architect",
      hours: 893,
      lastPlayed: "Last logged today",
      achievementCount: 30,
      totalAchievements: 45,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
      tags: ["Node.js", "GraphQL", "Redis"]
    },
    {
      id: "3",
      title: "AI Image Generator",
      role: "Full Stack",
      hours: 84,
      lastPlayed: "Nov 26",
      achievementCount: 27,
      totalAchievements: 320,
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
      tags: ["Python", "TensorFlow", "React"]
    }
  ];

  const friends: Friend[] = [
    { id: 1, name: "Sarah Design", status: "Online", level: 50, avatarColor: "bg-purple-500" },
    { id: 2, name: "Mike Manager", status: "Away", level: 32, avatarColor: "bg-blue-500" },
    { id: 3, name: "Jessica QA", status: "In-Game", level: 19, avatarColor: "bg-green-500" },
    { id: 4, name: "Tom DevOps", status: "Offline", level: 41, avatarColor: "bg-red-500" },
    { id: 5, name: "Client A", status: "Online", level: 12, avatarColor: "bg-yellow-500" },
    { id: 6, name: "Recruiter B", status: "Mobile", level: 8, avatarColor: "bg-indigo-500" },
  ];

  const badges = [
    { id: 1, icon: <Code size={24} />, name: "Polyglot", level: "500 XP" },
    { id: 2, icon: <Trophy size={24} />, name: "Top Rated", level: "100 XP" },
    { id: 3, icon: <Star size={24} />, name: "Rising Star", level: "25+ Projects" },
    { id: 4, icon: <Award size={24} />, name: "Certified", level: "AWS Pro" },
  ];

  return (
    <div className="min-h-screen bg-[#1b2838] text-[#c6d4df] font-sans selection:bg-[#54a5d4] selection:text-white overflow-x-hidden">
      
      {/* --- Global Header (Steam Navbar) --- */}
      <div className="bg-[#171a21] text-[#b8b6b4] text-xs font-medium uppercase py-1 px-4 flex items-center justify-between font-sans shadow-lg z-50 relative">
        <div className="flex items-center space-x-6 max-w-[940px] mx-auto w-full">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors">
            <Gamepad2 size={24} className="text-[#c5c3c0]" />
            <span className="text-xl font-bold tracking-widest text-white">STEAM</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-[#1a9fff] transition-colors">Store</a>
            <a href="#" className="text-[#1a9fff] border-b-2 border-[#1a9fff] pb-4 -mb-4">Community</a>
            <a href="#" className="hover:text-[#1a9fff] transition-colors">About</a>
            <a href="#" className="hover:text-[#1a9fff] transition-colors">Support</a>
          </nav>
        </div>
        <div className="flex items-center space-x-2 text-[11px]">
          <button className="bg-[#5c7e10] hover:bg-[#76a117] text-white px-3 py-1 rounded-[2px] mr-2 flex items-center transition-colors">
            <Monitor size={12} className="mr-1" /> Install Steam
          </button>
          <span className="text-[#c6d4df] cursor-pointer hover:text-white">login</span>
          <span className="mx-1">|</span>
          <span className="text-[#c6d4df] cursor-pointer hover:text-white flex items-center">
            language <ChevronDown size={10} className="ml-1" />
          </span>
        </div>
      </div>

      {/* --- Main Background with Synthwave Visuals --- */}
      <div className="relative w-full">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 h-[1200px] overflow-hidden">
             {/* Gradient Overlay for that specific purple/pink sky look */}
             <div className="absolute inset-0 bg-gradient-to-b from-[#1b2838] via-transparent to-[#1b2838] z-10"></div>
             
             {/* Actual Image - Using a synthwave/retrowave stock photo */}
             <img 
               src="https://images.unsplash.com/photo-1535970793482-8808b3762728?q=80&w=2070&auto=format&fit=crop" 
               alt="Background" 
               className="w-full h-full object-cover object-top opacity-60"
             />
        </div>

        {/* --- Content Container --- */}
        <div className="relative z-20 max-w-[960px] mx-auto pt-8 pb-20 px-4 md:px-0">
          
          {/* --- Profile Header Area --- */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Avatar Box */}
            <div className="relative group shrink-0">
               <div className="w-[166px] h-[166px] bg-gradient-to-br from-[#4c5462] to-[#282d36] p-1 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" 
                    alt="Profile" 
                    className="w-full h-full object-cover border border-[#000000]"
                  />
               </div>
               {/* Online Status overlay if needed, usually text in Steam */}
            </div>

            {/* Profile Info */}
            <div className="flex-grow pt-2">
              <div className="flex justify-between items-start">
                <div>
                   <h1 className="text-4xl text-white font-extralight mb-2 drop-shadow-md font-[Arial,sans-serif]">
                     {profile.name} <span className="text-lg text-[#c6d4df] cursor-pointer hover:text-white">▼</span>
                   </h1>
                   <div className="flex items-center text-[#8f98a0] text-sm space-x-2 mb-4">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" className="w-5 h-auto hidden" alt="flag" /> {/* Placeholder logic for flag */}
                      <span className="text-[#c6d4df]">{profile.location}</span>
                   </div>
                   <div className="text-[#c6d4df] text-[13px] leading-relaxed max-w-xl">
                     {profile.summary}
                   </div>
                   <div className="mt-2 text-[#54a5d4] hover:underline cursor-pointer text-xs">
                     View more info
                   </div>
                </div>

                {/* Level Badge */}
                <div className="flex flex-col items-end">
                   <div className="flex items-center space-x-2 mb-2">
                      <div className="text-2xl font-normal text-white">Level</div>
                      <div className="w-[52px] h-[52px] rounded-full border-2 border-[#d95b43] bg-[#1b2838] flex items-center justify-center text-2xl text-white font-bold shadow-[0_0_10px_#d95b43]">
                        {profile.level}
                      </div>
                   </div>
                   
                   {/* Featured Badge Pill */}
                   <div className="bg-[#222431]/80 border border-[#3c3d4e] rounded-sm p-2 flex items-center space-x-2 min-w-[200px] cursor-pointer hover:bg-[#282b3b] transition-colors">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded flex items-center justify-center border border-yellow-500/50">
                        <Trophy size={20} className="text-yellow-500" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">Global Sentinel</div>
                        <div className="text-[#626366] text-[10px]">500 XP</div>
                      </div>
                   </div>
                   <div className="flex space-x-1 mt-2">
                      <div className="px-2 py-[2px] bg-[#212c3d] border border-[#3e5373] text-[#54a5d4] text-[10px] rounded hover:bg-[#3d4f68] cursor-pointer transition-colors">
                         Add Friend
                      </div>
                      <div className="px-2 py-[2px] bg-[#212c3d] border border-[#3e5373] text-[#54a5d4] text-[10px] rounded hover:bg-[#3d4f68] cursor-pointer transition-colors">
                         <MessageSquare size={12} />
                      </div>
                      <div className="px-2 py-[2px] bg-[#212c3d] border border-[#3e5373] text-[#54a5d4] text-[10px] rounded hover:bg-[#3d4f68] cursor-pointer transition-colors">
                         More
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Glassmorphism Main Body --- */}
          <div className="bg-[#000000]/40 backdrop-blur-sm p-4 rounded min-h-[600px] flex flex-col md:flex-row gap-6">
            
            {/* --- Left Column: Main Content (Showcases) --- */}
            <div className="w-full md:w-2/3 space-y-8">
              
              {/* Featured Showcase (Game Collector Style) */}
              <div>
                <div className="flex justify-between items-center mb-1 text-[#5491cf] hover:text-[#ffffff] cursor-pointer transition-colors">
                  <h3 className="text-base uppercase tracking-wider font-semibold">Project Showcase</h3>
                  <div className="text-xs hover:underline">1,337 Lines of Code</div>
                </div>
                <div className="bg-[#000000]/20 p-3 border border-[#2c3d52] rounded-sm">
                   <div className="grid grid-cols-2 gap-3 mb-3">
                      {featuredProjects.map((project, idx) => (
                        <div key={idx} className="relative group cursor-pointer">
                          <img src={project.image} alt={project.title} className="w-full h-32 object-cover border border-[#000] group-hover:border-[#54a5d4] transition-colors" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                             <div className="text-white text-sm font-bold truncate">{project.title}</div>
                             <div className="text-[#8f98a0] text-xs">{project.label}</div>
                          </div>
                          {/* Achievement Bar */}
                          <div className="absolute top-0 right-0 bg-[#000]/80 px-2 py-1 flex items-center space-x-1 border-l border-b border-[#2c3d52]">
                             <Trophy size={12} className="text-[#fca311]" />
                             <span className="text-xs text-[#54a5d4] font-bold">{project.progress}/{project.total}</span>
                          </div>
                        </div>
                      ))}
                   </div>
                   
                   {/* Stats Row */}
                   <div className="bg-[#1b2838] p-3 flex justify-between items-center border border-[#000000]">
                      <div className="text-center">
                        <div className="text-2xl text-white font-light">20</div>
                        <div className="text-xs text-[#626366] uppercase">Projects Shipped</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl text-white font-light">2,718</div>
                        <div className="text-xs text-[#626366] uppercase">Commits Pushed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl text-white font-light">100%</div>
                        <div className="text-xs text-[#626366] uppercase">Completion Rate</div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-[#5491cf] text-base hover:text-white cursor-pointer transition-colors uppercase font-semibold">Recent Work</h3>
                  <div className="text-xs text-[#8f98a0]">17 hours in last 2 weeks</div>
                </div>

                <div className="space-y-[1px]">
                  {recentActivity.map((project) => (
                    <div key={project.id} className="bg-[#000000]/30 hover:bg-[#2b3543] p-3 flex gap-4 items-start border-t border-[#343e4c] transition-colors group cursor-pointer">
                      <img src={project.image} alt={project.title} className="w-[184px] h-[69px] object-cover shadow-md border border-transparent group-hover:border-[#54a5d4]/30" />
                      
                      <div className="flex-grow">
                        <div className="text-white font-medium group-hover:text-[#54a5d4]">{project.title}</div>
                        <div className="text-[#8f98a0] text-xs mt-1">{project.hours} hrs on record</div>
                        <div className="text-[#626366] text-xs mt-0.5">Last updated: {project.lastPlayed}</div>
                      </div>

                      <div className="hidden sm:block w-48">
                         <div className="text-[#8f98a0] text-xs mb-1 font-semibold tracking-wide">ACHIEVEMENT PROGRESS</div>
                         <div className="flex items-center space-x-2">
                             <div className="flex-grow h-2 bg-[#343e4c] rounded-full overflow-hidden">
                               <div className="h-full bg-gradient-to-r from-[#1a9fff] to-[#54a5d4]" style={{ width: `${(project.achievementCount / project.totalAchievements) * 100}%` }}></div>
                             </div>
                             <span className="text-[#8f98a0] text-xs font-mono">{project.achievementCount} of {project.totalAchievements}</span>
                         </div>
                         <div className="flex mt-2 space-x-1">
                            {project.tags.map((tag, i) => (
                              <div key={i} className="w-6 h-6 bg-[#1b2838] border border-[#54a5d4] flex items-center justify-center rounded-sm" title={tag}>
                                 <span className="text-[10px] text-white font-bold">{tag[0]}</span>
                              </div>
                            ))}
                            {project.totalAchievements > 5 && (
                              <div className="w-6 h-6 flex items-center justify-center text-[#54a5d4] text-xs font-bold">+</div>
                            )}
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right mt-1">
                   <span className="text-xs text-[#8f98a0] hover:text-white cursor-pointer">View all 12 projects</span>
                </div>
              </div>

            </div>

            {/* --- Right Column: Sidebar --- */}
            <div className="w-full md:w-1/3 space-y-6">
              
              {/* Status Box */}
              <div className="mb-8">
                 <div className="text-2xl text-[#54a5d4] font-light">Currently Online</div>
                 <div className="border border-[#54a5d4] p-3 bg-[#000000]/20 mt-1">
                    <div className="text-[#54a5d4] text-sm font-semibold mb-1 hover:underline cursor-pointer">Designing UI</div>
                    <div className="text-[#8f98a0] text-xs">{profile.statusText}</div>
                    <div className="text-[#8f98a0] text-xs mt-1">Join Game</div>
                 </div>
              </div>

              {/* Badges (Skills) */}
              <div>
                 <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[#c6d4df] hover:text-white cursor-pointer">Badges</h3>
                    <span className="text-[#54a5d4] text-xs cursor-pointer hover:underline">15</span>
                 </div>
                 
                 <div className="bg-[#000000]/20 p-3 rounded-sm">
                    <div className="flex space-x-2 mb-3">
                       {badges.slice(0, 4).map((badge) => (
                         <div key={badge.id} className="w-1/4 aspect-square bg-[#222330] border border-[#3c3d4e] hover:border-white cursor-pointer flex flex-col items-center justify-center group relative p-1">
                            <div className="text-white group-hover:scale-110 transition-transform duration-200">
                               {badge.icon}
                            </div>
                            {/* Hover Tooltip - Simulated */}
                            <div className="absolute -bottom-8 bg-[#c2c2c2] text-[#3d3d3f] text-[10px] px-1 py-0.5 opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                               {badge.name}
                            </div>
                         </div>
                       ))}
                    </div>
                    
                    {/* Badge Summary */}
                    <div className="space-y-1">
                       <div className="flex justify-between text-xs text-[#8f98a0]">
                          <span>Tech Stack</span>
                          <span className="text-[#c6d4df]">26</span>
                       </div>
                       <div className="flex justify-between text-xs text-[#8f98a0]">
                          <span>Certifications</span>
                          <span className="text-[#c6d4df]">4</span>
                       </div>
                       <div className="flex justify-between text-xs text-[#8f98a0]">
                          <span>Hackathons</span>
                          <span className="text-[#c6d4df]">1</span>
                       </div>
                    </div>
                 </div>
              </div>

               {/* Groups (Tech Communities) */}
              <div>
                 <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[#c6d4df] hover:text-white cursor-pointer">Groups</h3>
                    <span className="text-[#54a5d4] text-xs cursor-pointer hover:underline">3</span>
                 </div>
                 <div className="flex items-center space-x-3 bg-[#000000]/20 p-2 mb-1 group cursor-pointer hover:bg-[#2b3543] transition-colors">
                     <div className="w-10 h-10 bg-[#1b2838] flex items-center justify-center border border-[#54a5d4]">
                        <Github size={24} className="text-white" />
                     </div>
                     <div>
                        <div className="text-[#c6d4df] text-sm font-semibold group-hover:text-[#54a5d4] group-hover:underline">Open Source Contributors</div>
                        <div className="text-[#626366] text-xs">319,670 Members</div>
                     </div>
                 </div>
              </div>

              {/* Friends (Network) */}
              <div>
                 <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[#c6d4df] hover:text-white cursor-pointer">Friends</h3>
                    <span className="text-[#54a5d4] text-xs cursor-pointer hover:underline">{friends.length}2</span>
                 </div>
                 <div className="grid grid-cols-1 gap-[2px]">
                    {friends.map((friend) => (
                       <div key={friend.id} className="flex items-center space-x-2 p-1.5 hover:bg-[#2b3543] cursor-pointer group transition-colors rounded-sm">
                          <div className={`w-8 h-8 ${friend.avatarColor} border border-[#000] shadow-sm flex items-center justify-center text-white text-[10px] font-bold`}>
                             {friend.name[0]}
                          </div>
                          <div className="flex flex-col flex-grow">
                             <div className="flex justify-between items-center">
                                <span className={`text-[13px] font-medium ${friend.status === 'Online' ? 'text-[#54a5d4]' : friend.status === 'In-Game' ? 'text-[#90ba3c]' : 'text-[#8f98a0]'} group-hover:underline`}>
                                   {friend.name}
                                </span>
                                <span className="bg-[#212c3d] text-[#c6d4df] text-[10px] px-1 rounded border border-[#3e5373]">{friend.level}</span>
                             </div>
                             <span className={`text-[11px] ${friend.status === 'Online' ? 'text-[#54a5d4]' : friend.status === 'In-Game' ? 'text-[#90ba3c]' : 'text-[#626366]'}`}>
                                {friend.status === 'In-Game' ? 'Debugging Production' : friend.status}
                             </span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

            </div>
          </div>
          
          {/* --- Bottom Link Bar --- */}
          <div className="bg-[#000000]/40 backdrop-blur-sm px-4 py-2 mt-4 flex justify-between items-center text-xs rounded">
              <div className="space-x-4 text-[#8f98a0]">
                 <span className="hover:text-white cursor-pointer hover:underline">View all 14 comments</span>
              </div>
              <div className="space-x-2 text-[#8f98a0]">
                  <span className="hover:text-white cursor-pointer hover:underline">Add a comment</span>
              </div>
          </div>

        </div>
      </div>

      {/* --- Footer --- */}
      <div className="bg-[#171a21] py-12 px-4 text-center border-t border-[#2a475e]">
         <div className="max-w-[960px] mx-auto flex flex-col items-center">
            <div className="h-px w-full bg-[#343e4c] mb-8"></div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-[#626366] tracking-tighter uppercase border-2 border-[#626366] p-1 px-2">VALVE</div>
              <div className="text-[#8f98a0] text-xs text-left max-w-lg">
                 © 2025 Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
                 <br/>
                 <span className="text-[#54a5d4] hover:white cursor-pointer">Privacy Policy</span> | <span className="text-[#54a5d4] hover:white cursor-pointer">Legal</span> | <span className="text-[#54a5d4] hover:white cursor-pointer">Steam Subscriber Agreement</span>
              </div>
            </div>
         </div>
      </div>

    </div>
  );
}