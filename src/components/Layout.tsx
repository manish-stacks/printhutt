"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import AdminLayout from "./admin/AdminLayout";
import AOS from "aos";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Run animation only once
    });
  }, []);

  if (isAdminRoute) return <AdminLayout>{children}</AdminLayout>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;