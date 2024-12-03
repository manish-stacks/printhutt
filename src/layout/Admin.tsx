import Header from '@/components/admin/Header';
import { Sidebar } from '@/components/admin/Sidebar';
import React, { ReactNode, useState } from 'react'

interface LayoutProps {
    children: ReactNode;
}

const Admin = ({ children }: LayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <>

            <div className="min-h-screen bg-gray-50">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                {children}
            </div>
        </>
    )
}

export default Admin