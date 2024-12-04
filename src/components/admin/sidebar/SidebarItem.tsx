import React, { ElementType } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';


interface SidebarItemProps {
  icon: ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  hasSubItems?: boolean;
  isExpanded?: boolean;
  onClick: () => void;
}

export function SidebarItem({
  icon: Icon,
  label,
  isActive,
  isCollapsed,
  hasSubItems,
  isExpanded,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors
        ${isActive ? 'bg-gray-700 text-white border-l-4 border-blue-500' : ''}`}
    >
      <Icon size={20} />
      {!isCollapsed && (
        <>
          <span className="ml-4 flex-1 text-left">{label}</span>
          {hasSubItems && (
            <span className="ml-2">
              {isExpanded ? (
                <FaChevronDown size={16} />
              ) : (
                <FaChevronRight size={16} />
              )}
            </span>
          )}
        </>
      )}
    </button>
  );
}