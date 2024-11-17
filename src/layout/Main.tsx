"use client";
import React, { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Aos from "aos";
import AppLayout from "./app";
import AdminLayout from "./admin";



interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isAdminRoute = pathname!.startsWith("/admin");

  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration in ms
      once: true, // Run animation only once
    });
  }, []);
 
  
  if (isAdminRoute) {
    return (
      <>
        <AdminLayout>
          {children}
        </AdminLayout>
      </>
    )
  }

  return (
    <>
      <AppLayout >
        {children}
      </AppLayout >
    </>
  );
};

export default Layout;