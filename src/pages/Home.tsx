"use client";
import React from "react";
import CategoryHome from "@/components/home/CategoryHome";
import Testimonials from "@/components/Testimonials";
// import BlogHome from "@/components/BlogHome";
// import InstagramHome from "@/components/InstagramHome";
import NewProductArea from "@/components/NewProductArea";
import OurServices from "@/components/OurServices";
import HeroSlider from "@/components/home/HeroSlider";
// import PersonalisedGifts from "@/components/home/PersonalisedGifts";
import DayoftheDeal from "@/components/home/DayoftheDeal";
import BannerOne from "@/components/home/BannerOne";
import BannerTwo from "@/components/home/BannerTwo";


const HomeComponent = () => {

  return (
    <>
      <HeroSlider />
      {/*  Category  */}
      <CategoryHome />

      {/* <PersonalisedGifts /> */}
      {/* Day of the deal */}
      <DayoftheDeal />

      {/* Banner-one */}
      <BannerOne />

      {/* Banner-two  */}
      <BannerTwo />

      {/* New Product tab Area */}
      <NewProductArea />

      {/*  Services  */}
      <OurServices />

      {/* Product */}
      {/* <HomeProduct /> */}


      {/* Testimonials */}
      <Testimonials />

      {/* <BlogHome /> */}
      {/* Blog */}

      {/* Instagram */}
      {/* <InstagramHome /> */}

    </>
  );
};

export default HomeComponent;