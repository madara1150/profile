import React from 'react'
import { recentActivity } from './data'

export default function RecentActivity() {
  return (
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
                  <div className="h-full bg-gradient-to-r from-[#1a9fff] to-[#54a5d4]" style={{ width: `${(project.achievementCount! / (project.totalAchievements || 1)) * 100}%` }}></div>
                </div>
                <span className="text-[#8f98a0] text-xs font-mono">{project.achievementCount} of {project.totalAchievements}</span>
              </div>
              <div className="flex mt-2 space-x-1">
                {project.tags?.map((tag, i) => (
                  <div key={i} className="w-6 h-6 bg-[#1b2838] border border-[#54a5d4] flex items-center justify-center rounded-sm" title={tag}>
                    <span className="text-[10px] text-white font-bold">{tag[0]}</span>
                  </div>
                ))}
                {project.totalAchievements && project.totalAchievements > 5 && (
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
  )
}
