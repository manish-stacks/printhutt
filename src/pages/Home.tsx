"use client";
import React, { useEffect } from "react";
import CategoryHome from "@/components/home/CategoryHome";
import Testimonials from "@/components/Testimonials";

import NewProductArea from "@/components/NewProductArea";
import OurServices from "@/components/OurServices";
import HeroSlider from "@/components/home/HeroSlider";
import DayoftheDeal from "@/components/home/DayoftheDeal";
import BannerOne from "@/components/home/BannerOne";
import confetti from "canvas-confetti";
import PersonalisedGifts from "@/components/home/PersonalisedGifts";
import PersonalisedGiftsTwo from "@/components/home/PersonalisedGiftsTwo";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const HomeComponent = () => {
  useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");
    const sessionExpiresAt = localStorage.getItem("session_expires_at");

    const currentTime = Date.now();

    if (!storedSessionId || !sessionExpiresAt || currentTime > sessionExpiresAt) {

      const newSessionId = uuidv4();
      const expiresAt = currentTime + 3 * 60 * 60 * 1000;

      localStorage.setItem("session_id", newSessionId);
      localStorage.setItem("session_expires_at", expiresAt);

      console.log("New session created:", newSessionId);
    } else {
      console.log("Existing session found:", storedSessionId);
    }
  }, []);


  return (
    <>
      <HeroSlider />

      <CategoryHome />


      <section className="section-banner-one overflow-hidden py-[50px] max-[1199px]:py-[35px] bg-slate-300">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-6 lg:px-16 py-10 max-w-7xl mx-auto">


          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2">
            {/* <img
              src="https://res.cloudinary.com/dkprths9f/image/upload/v1736597008/Acrylic-Frame_scbtw9.webp"
              alt="Acrylic Photo"
              className="w-[470px] h-auto rounded-lg shadow-lg"
            /> */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-[470px] h-auto rounded-lg shadow-lg border-2 border-gray-900"
              width="470" height="470"
              preload="none"
            >
              <source src="https://res.cloudinary.com/dkprths9f/video/upload/v1740661386/WhatsApp_Video_2025-02-27_at_6.31.50_PM_okb8mf.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Acrylic Photo
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Showcase your loved ones in a striking way with the unique Clear
              Acrylic Photo. Featuring a personalized, people-only design where the
              background is removed, allowing your wall to seamlessly integrate
              through the transparent areas.
            </p>
            <Link
              href="/product-details/customized-wall-photo-frame-acrylic--acrylic-photo-frame"
              className="px-6 py-3 text-lg font-medium bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section >

      <PersonalisedGifts />

      <PersonalisedGiftsTwo />

      <DayoftheDeal />


      <NewProductArea />

      <OurServices />

      <BannerOne />

      <Testimonials />


    </>
  );
};

export default HomeComponent;