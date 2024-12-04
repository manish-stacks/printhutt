import Header from '@/components/admin/header/Header';
import { MainContent } from '@/components/admin/MainContent';
import { Sidebar } from '@/components/admin/sidebar/Sidebar';
import React, { ReactNode, useState } from 'react'

interface LayoutProps {
    children: ReactNode;
}

const Admin = ({ children }: LayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <>

            <div className="min-h-screen bg-gray-100">
                <Header isSidebarCollapsed={sidebarCollapsed} onMenuClick={() => setSidebarOpen(true)} />

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    onCollapsedChange={setSidebarCollapsed}
                />

                <MainContent isSidebarCollapsed={sidebarCollapsed}>
                    {children}
                </MainContent>
            </div>
        </>
    )
}

export default Admin