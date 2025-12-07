import React from 'react'
import { badges, friends } from './data'
import { Github } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="w-full md:w-1/3 space-y-6">
      <div className="mb-8">
        <div className="text-2xl text-[#54a5d4] font-light">Currently Online</div>
        <div className="border border-[#54a5d4] p-3 bg-[#000000]/20 mt-1">
          <div className="text-[#54a5d4] text-sm font-semibold mb-1 hover:underline cursor-pointer">Designing UI</div>
          <div className="text-[#8f98a0] text-xs">Currently coding in VS Code</div>
          <div className="text-[#8f98a0] text-xs mt-1">Join Game</div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="text-[#c6d4df] hover:text-white cursor-pointer">Badges</h3>
          <span className="text-[#54a5d4] text-xs cursor-pointer hover:underline">15</span>
        </div>
        <div className="bg-[#000000]/20 p-3 rounded-sm">
          <div className="flex space-x-2 mb-3">
            {badges.slice(0, 4).map((badge) => (
              <div key={badge.id} className="w-1/4 aspect-square bg-[#222330] border border-[#3c3d4e] hover:border-white cursor-pointer flex flex-col items-center justify-center group relative p-1">
                <div className="text-white group-hover:scale-110 transition-transform duration-200">{badge.icon}</div>
                <div className="absolute -bottom-8 bg-[#c2c2c2] text-[#3d3d3f] text-[10px] px-1 py-0.5 opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">{badge.name}</div>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[#8f98a0]"><span>Tech Stack</span><span className="text-[#c6d4df]">26</span></div>
            <div className="flex justify-between text-xs text-[#8f98a0]"><span>Certifications</span><span className="text-[#c6d4df]">4</span></div>
            <div className="flex justify-between text-xs text-[#8f98a0]"><span>Hackathons</span><span className="text-[#c6d4df]">1</span></div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="text-[#c6d4df] hover:text-white cursor-pointer">Groups</h3>
          <span className="text-[#54a5d4] text-xs cursor-pointer hover:underline">3</span>
        </div>
        <div className="flex items-center space-x-3 bg-[#000000]/20 p-2 mb-1 group cursor-pointer hover:bg-[#2b3543] transition-colors">
          <div className="w-10 h-10 bg-[#1b2838] flex items-center justify-center border border-[#54a5d4]"><Github size={24} className="text-white" /></div>
          <div>
            <div className="text-[#c6d4df] text-sm font-semibold group-hover:text-[#54a5d4] group-hover:underline">Open Source Contributors</div>
            <div className="text-[#626366] text-xs">319,670 Members</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="text-[#c6d4df] hover:text-white cursor-pointer">Friends</h3>
          <span className="text-[#54a5d4] text-xs cursor-pointer hover:underline">{friends.length}</span>
        </div>
        <div className="grid grid-cols-1 gap-[2px]">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-2 p-1.5 hover:bg-[#2b3543] cursor-pointer group transition-colors rounded-sm">
              <div className={`${friend.avatarColor} w-8 h-8 border border-[#000] shadow-sm flex items-center justify-center text-white text-[10px] font-bold`}>{friend.name[0]}</div>
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-center">
                  <span className={`text-[13px] font-medium ${friend.status === 'Online' ? 'text-[#54a5d4]' : friend.status === 'In-Game' ? 'text-[#90ba3c]' : 'text-[#8f98a0]'} group-hover:underline`}>{friend.name}</span>
                  <span className="bg-[#212c3d] text-[#c6d4df] text-[10px] px-1 rounded border border-[#3e5373]">{friend.level}</span>
                </div>
                <span className={`text-[11px] ${friend.status === 'Online' ? 'text-[#54a5d4]' : friend.status === 'In-Game' ? 'text-[#90ba3c]' : 'text-[#626366]'}`}>{friend.status === 'In-Game' ? 'Debugging Production' : friend.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
