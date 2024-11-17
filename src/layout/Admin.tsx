import AdminHeader from '@/components/admin/Header';
import AdminSidebar from '@/components/admin/Sidebar';
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode;
}

const Admin = ({ children }: LayoutProps) => {

    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */}
                <AdminSidebar />
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    {/* Navbar */}
                    <AdminHeader />
                    {/* Main Content */}
                    {children}
                </div>
            </div>
        </>
    )
}

export default Admin