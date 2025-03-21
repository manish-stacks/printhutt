"use client";
import React, { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Aos from "aos";
import AppLayout from "./App";
import AdminLayout from "./Admin";



interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isAdminRoute = pathname!.startsWith("/admin");

  useEffect(() => {
    Aos.init({
      duration: 1000, 
      once: true, 
    });
  }, []);
 
  
  
  const blacklists = [
    "/admin",
    "/admin/login"
  ]

  const isBlacklist = blacklists.includes(pathname!)
  
  if(isBlacklist){
    return (<>{children}</>)
  }

  


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