import type { Metadata } from "next";
import MainLayout from "@/layout/Main";
import "./globals.css";
import '/public/style.css';
import '/public/acrylic.css';
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

        {/* Add Meta Pixel script */}
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){
                n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '762819811557058');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=762819811557058&ev=PageView&noscript=1"
          />
        </noscript>

        {/* clarity script */}
        <Script>
          {`
            (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ogasp3952p");
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
