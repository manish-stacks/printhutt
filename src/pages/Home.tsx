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

      <PersonalisedGifts />

      <DayoftheDeal />

      <PersonalisedGiftsTwo />

      <NewProductArea />

      <OurServices />

      <BannerOne />
 
      <Testimonials />


    </>
  );
};

export default HomeComponent;