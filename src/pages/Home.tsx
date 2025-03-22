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


  const testimonials = [
    {
      name: 'Jackie I.',
      date: '5/6/2020',
      rating: 5,
      content: 'This ring is absolutely divine, beautiful to look at, fabulous quality, gorgeous stone, perfect all around ✨',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Luisa S.',
      date: '16/5/2020',
      rating: 5,
      content: 'Love the cheese bits in every bite 🧀',
      imageUrl: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      hasVideo: true,
    },
    {
      name: 'Victoria P.',
      date: '1/2/2021',
      rating: 5,
      content: 'From coast to coast, my husband and I have traveled for and tasted LOTS of coffee. I can truly say Sundream is the best! It is the only coffee we buy anymore! Buy it yourself and tell all your friends, this is the real deal!',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Robert F.',
      date: '11/2/2020',
      rating: 5,
      content: 'The color is GORGEOUS! It\'s even bigger than I was expecting but I love it!',
      imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];
  

  return (
    <>
      <HeroSlider />
      <CategoryHome />
      <AcrylicPhotoVideo />
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