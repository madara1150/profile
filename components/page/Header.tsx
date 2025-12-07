import React from 'react'
import { Gamepad2, Monitor, ChevronDown } from 'lucide-react'

export default function Header() {
  return (
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
  )
}
