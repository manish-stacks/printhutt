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
            <SidebarItem
              key={item.id}
              icon={() => <div style={{ width: 20 }} />} // Empty icon
              label={item.label}
              path={item.path}
              isActive={activeItem === item.path}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
