import React, { useState } from 'react';
import { SidebarItem } from './SidebarItem';
import { SubMenu } from './SubMenu';
import { mainMenuItems } from './menuItems';
import { RiContractLeftLine, RiContractRightLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ isOpen, onClose, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname() as string;
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapsedChange(newCollapsed);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`bg-gray-800 text-white h-screen transition-all duration-300 
          ${collapsed ? 'w-16' : 'w-64'} fixed left-0 top-0 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-10`}
      >
        <div className="p-4 flex items-center justify-between">
          {!collapsed && <h2 className="text-xl font-bold">Admin</h2>}
          <button
            onClick={handleCollapse}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            {collapsed ? <RiContractRightLine size={20} /> : <RiContractLeftLine size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {mainMenuItems.map((item) => (
            item.submenu ? (
              <SubMenu
                key={item.id}
                icon={item.icon}
                label={item.label}
                items={item.submenu}
                isCollapsed={collapsed}
                activeItem={pathname}
                onItemClick={(path) => console.log(`Navigating to ${path}`)}
              />
            ) : (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={pathname === item.path}
                isCollapsed={collapsed}
                onClick={() => console.log(`Navigating to ${item.path}`)}
              />
            )
          ))}
        </nav>
      </aside>
    </>
  );
}
