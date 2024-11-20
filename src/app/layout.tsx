import type { Metadata } from "next";
import MainLayout from "@/layout/Main";
import "./globals.css";
import '/public/style.css';
import 'animate.css';
import "aos/dist/aos.css";
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import "aos/dist/aos.css";
import 'remixicon/fonts/remixicon.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: "Shop made for everyone’s dream Decoration - Print Hutt",
  description:
    "We are India No.1 neon light makers. We make customised neon lights and signs for your home, business or events. If you’re looking for a high-quality, custom neon sign maker, contact us at Neon Attack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          <ToastContainer/>
          {children}
        </MainLayout>
      </body>

    </html>
  );
}
