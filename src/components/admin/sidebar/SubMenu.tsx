import React, { ElementType } from 'react';
import { SidebarItem } from './SidebarItem';


interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

interface SubMenuProps {
  icon: ElementType;
  label: string;
  items: SubMenuItem[];
  isCollapsed: boolean;
  activeItem: string;
  onItemClick: (path: string) => void;
}

export function SubMenu({
  icon,
  label,
  items,
  isCollapsed,
  activeItem,
  onItemClick,
}: SubMenuProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isActive = items.some((item) => item.path === activeItem);

  return (
    <div>
      <SidebarItem
        icon={icon}
        label={label}
        isActive={isActive}
        isCollapsed={isCollapsed}
        hasSubItems={true}
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />
      {!isCollapsed && isExpanded && (
        <div className="ml-6 mt-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item.path)}
              className={`w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors
                ${activeItem === item.path ? 'bg-gray-700 text-white' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}