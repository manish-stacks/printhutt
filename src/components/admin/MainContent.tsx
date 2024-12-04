import React from 'react';

interface MainContentProps {
  isSidebarCollapsed: boolean;
  children: React.ReactNode;
}

export function MainContent({ isSidebarCollapsed, children }: MainContentProps) {
  return (
    <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'} p-8`}>
      <div className=" mx-auto">
        {children}
      </div>
    </main>
  );
}