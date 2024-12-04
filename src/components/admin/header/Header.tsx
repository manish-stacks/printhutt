import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { RiCloseCircleFill, RiMenu3Fill, RiNotification3Line, RiSearch2Line } from 'react-icons/ri';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  onMenuClick: () => void;
}
const Header = ({ isSidebarCollapsed, onMenuClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 ${isSidebarCollapsed ? 'lg:left-[4rem]' : 'lg:left-64'}`}>
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
              className="w-80 rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-gray-600 bg-gray-100 rounded-full hover:text-gray-900 focus:outline-none"
            >
              <RiNotification3Line size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-500">No new notifications</p>
                  </div>
                </div>
              </div>
            )}
          </div>


          <UserMenu />
        </div>
      </header>
    </>
  )
}

export default Header