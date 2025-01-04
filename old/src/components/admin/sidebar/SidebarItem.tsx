import React, { ElementType } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface SidebarItemProps {
  icon: ElementType;
  label: string;
  path?: string;
  isActive: boolean;
  isCollapsed: boolean;
  hasSubItems?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  icon: Icon,
  label,
  path,
  isActive,
  isCollapsed,
  hasSubItems,
  isExpanded,
  onClick,
}: SidebarItemProps) {
  const Wrapper = path ? Link : 'button'; // Use Link if path exists, otherwise render as button.

  return (
    <Wrapper
      href={path}
      onClick={path ? undefined : onClick}
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
    </Wrapper>
  );
}
