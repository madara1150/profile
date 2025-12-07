import React from 'react'

export default function Footer() {
  return (
    <div className="bg-[#171a21] py-12 px-4 text-center border-t border-[#2a475e]">
      <div className="max-w-[960px] mx-auto flex flex-col items-center">
        <div className="h-px w-full bg-[#343e4c] mb-8"></div>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="text-2xl font-bold text-[#626366] tracking-tighter uppercase border-2 border-[#626366] p-1 px-2">VALVE</div>
          <div className="text-[#8f98a0] text-xs text-left max-w-lg">
            © 2025 Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
            <br />
            <span className="text-[#54a5d4] hover:white cursor-pointer">Privacy Policy</span> | <span className="text-[#54a5d4] hover:white cursor-pointer">Legal</span> | <span className="text-[#54a5d4] hover:white cursor-pointer">Steam Subscriber Agreement</span>
          </div>
        </div>
      </div>
    </div>
  )
}
