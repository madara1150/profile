import React from 'react'
import { featuredProjects } from './data'
import { Trophy } from 'lucide-react'

export default function Showcase() {
  return (
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
              <div className="absolute top-0 right-0 bg-[#000]/80 px-2 py-1 flex items-center space-x-1 border-l border-b border-[#2c3d52]">
                <Trophy size={12} className="text-[#fca311]" />
                <span className="text-xs text-[#54a5d4] font-bold">{project.progress}/{project.total}</span>
              </div>
            </div>
          ))}
        </div>

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
  )
}
