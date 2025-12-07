import React from 'react'
import Header from '../components/page/Header'
import ProfileHeader from '../components/page/ProfileHeader'
import Showcase from '../components/page/Showcase'
import RecentActivity from '../components/page/RecentActivity'
import Sidebar from '../components/page/Sidebar'
import Footer from '../components/page/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1b2838] text-[#c6d4df] font-sans selection:bg-[#54a5d4] selection:text-white overflow-x-hidden">
      <Header />

      <div className="relative w-full">
        <div className="absolute inset-0 z-0 h-[1200px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b2838] via-transparent to-[#1b2838] z-10"></div>
          <img src="https://images.unsplash.com/photo-1535970793482-8808b3762728?q=80&w=2070&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover object-top opacity-60" />
        </div>

        <div className="relative z-20 max-w-[960px] mx-auto pt-8 pb-20 px-4 md:px-0">
          <ProfileHeader />

          <div className="bg-[#000000]/40 backdrop-blur-sm p-4 rounded min-h-[600px] flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3 space-y-8">
              <Showcase />
              <RecentActivity />
            </div>

            <Sidebar />
          </div>

          <div className="bg-[#000000]/40 backdrop-blur-sm px-4 py-2 mt-4 flex justify-between items-center text-xs rounded">
            <div className="space-x-4 text-[#8f98a0]"><span className="hover:text-white cursor-pointer hover:underline">View all 14 comments</span></div>
            <div className="space-x-2 text-[#8f98a0]"><span className="hover:text-white cursor-pointer hover:underline">Add a comment</span></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
