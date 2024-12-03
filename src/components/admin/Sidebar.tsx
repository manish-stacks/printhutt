import React, { createElement, useState } from 'react';
import { FaHome, FaLayerGroup, FaUser } from 'react-icons/fa';
import { RiBarChart2Fill, RiCloseLine, RiMailFill, RiSettings2Fill } from 'react-icons/ri';



const menuItems = [
  { icon: FaHome, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FaUser, label: 'Users', href: '/users' },
  { icon: RiBarChart2Fill, label: 'Analytics', href: '/analytics' },
  { icon: FaLayerGroup, label: 'Products', href: '/products' },
  { icon: RiMailFill, label: 'Messages', href: '/messages' },
  { icon: RiSettings2Fill, label: 'Settings', href: '/settings' },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isActive,setIsActive]=useState<boolean>(false);
  // const isActive = window.location.pathname === '/admin/dashboard'//href;

  const handleItemClick = (href: string) => {
  }



  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-gradient-to-b bg-gray-800 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={onClose}
            className="rounded p-1 text-white hover:bg-gray-700 lg:hidden"
            aria-label="Close sidebar"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-blue-100 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  {createElement(item.icon, { className: 'h-5 w-5' })}
                  {item.label}
                </a>
              </li>
            ))}

          </ul>
        </nav>
      </aside>
    </>
  );
}