import type { Metadata } from "next";
import MainLayout from "@/layout/Main";
import "./globals.css";
import '/public/style.css';
import 'animate.css';
import "aos/dist/aos.css";
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Script from "next/script";


export const metadata: Metadata = {
  title: "Shop made for everyone’s dream Decoration - Print Hutt",
  description:
    "We are India No.1 neon light makers. We make customized neon lights and signs for your home, business or events. If you’re looking for a high-quality, custom neon sign maker, contact us at PrintHutt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KT48HWMX');
          `}
        </Script>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '597830392692641');
            fbq('track', 'PageView');
          `}
        </Script>


        {/* Google Analytics Script */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-J6WJBSM32C`}
          strategy="afterInteractive"
        />

        {/* Initialize Google Analytics */}
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J6WJBSM32C');
        `}
        </Script>


      </head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KT48HWMX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=597830392692641&ev=PageView&noscript=1"
            alt="Facebook Pixel"
          />
        </noscript>

        <MainLayout>
          <ToastContainer position="top-center" />
          {children}
        </MainLayout>
      </body>

    </html>
  )
}
