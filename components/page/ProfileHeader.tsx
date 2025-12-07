import React from 'react'
import { Trophy, MessageSquare } from 'lucide-react'
import { profile } from './data'

export default function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative group shrink-0">
        <div className="neon-frame w-[166px] h-[166px] rounded-md">
          <div className="neon-ring rounded-md"></div>
          <div className="neon-inner relative w-full h-full rounded-md overflow-hidden flex items-center justify-center bg-[#1b2838] p-1 shadow-lg">
            <img
              src="https://static.wikia.nocookie.net/naruto/images/0/06/Kid_Madara.png?cb=20230320174531?w=300&q=80"
              alt="Profile"
              className="w-full h-full object-cover border border-[#000000]"
            />
          </div>
        </div>
      </div>

      <div className="flex-grow pt-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl text-white font-extralight mb-2 drop-shadow-md font-[Arial,sans-serif]">
              {profile.name} <span className="text-lg text-[#c6d4df] cursor-pointer hover:text-white">▼</span>
            </h1>
            <div className="flex items-center text-[#8f98a0] text-sm space-x-2 mb-4">
              <span className="text-[#c6d4df]">{profile.location}</span>
            </div>
            <div className="text-[#c6d4df] text-[13px] leading-relaxed max-w-xl">{profile.summary}</div>
            <div className="mt-2 text-[#54a5d4] hover:underline cursor-pointer text-xs">View more info</div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-2xl font-normal text-white">Level</div>
              <div className="w-[52px] h-[52px] rounded-full border-2 border-[#d95b43] bg-[#1b2838] flex items-center justify-center text-2xl text-white font-bold shadow-[0_0_10px_#d95b43]">
                {profile.level}
              </div>
            </div>

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
              <div className="px-2 py-[2px] bg-[#212c3d] border border-[#3e5373] text-[#54a5d4] text-[10px] rounded hover:bg-[#3d4f68] cursor-pointer transition-colors">Add Friend</div>
              <div className="px-2 py-[2px] bg-[#212c3d] border border-[#3e5373] text-[#54a5d4] text-[10px] rounded hover:bg-[#3d4f68] cursor-pointer transition-colors">
                <MessageSquare size={12} />
              </div>
              <div className="px-2 py-[2px] bg-[#212c3d] border border-[#3e5373] text-[#54a5d4] text-[10px] rounded hover:bg-[#3d4f68] cursor-pointer transition-colors">More</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
