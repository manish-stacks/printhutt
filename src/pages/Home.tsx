"use client";
import React, { useEffect } from "react";
import CategoryHome from "@/components/home/CategoryHome";
import Testimonials from "@/components/Testimonials";
import NewProductArea from "@/components/NewProductArea";
import OurServices from "@/components/OurServices";
import HeroSlider from "@/components/home/HeroSlider";
import BannerOne from "@/components/home/BannerOne";
// import confetti from "canvas-confetti";
import { v4 as uuidv4 } from "uuid";
import AcrylicPhotoVideo from "@/components/home/AcrylicPhotoVideo";
import PersonalizedGifts from "@/components/home/PersonalisedGifts";
import PersonalizedGiftsTwo from "@/components/home/PersonalisedGiftsTwo";
import DayoftheWeek from "@/components/home/DayoftheDeal";
import { TestimonialCard } from "@/components/TestimonialCard";
import AcrylicPhotoVideoSlider from "@/components/home/AcrylicPhotoVideoSlider";

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
      <AcrylicPhotoVideoSlider />
      {/* <AcrylicPhotoVideo /> */}
      <PersonalizedGifts />
      <PersonalizedGiftsTwo />
      <DayoftheWeek />
      <NewProductArea />
      <OurServices />
      <BannerOne />
      <Testimonials />
      <TestimonialCard />
    </>
  );
};

export default HomeComponent;