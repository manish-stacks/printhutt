import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { RiMenu3Fill, RiMessage2Fill, RiNotification2Fill, RiNotification3Line, RiSearch2Fill, RiSearch2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { UserMenu } from './UserMenu';
interface HeaderProps {
  onMenuClick: () => void;
}
const Header = ({ onMenuClick }: HeaderProps) => {



  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 lg:left-64">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded p-1 hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <RiMenu3Fill className="h-6 w-6" />
          </button>
          <div className="relative hidden sm:block">
            <RiSearch2Line className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-64 rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded p-1 hover:bg-gray-100">
            <RiNotification3Line className="h-5 w-5" />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <UserMenu />
        </div>
      </header>
    </>
  )
}

export default Header