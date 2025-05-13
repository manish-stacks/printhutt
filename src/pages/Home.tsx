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
// import AcrylicPhotoVideo from "@/components/home/AcrylicPhotoVideo";
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


  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("hasVisitedBefore");
      if (!hasVisited) {
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem("hasVisitedBefore", "true");
        console.log("First time visit — reset done.");
      }
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
      <section className="section-contact py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="w-full px-[12px] hidden">
              <div
                className="section-title mb-[20px] pb-[20px] relative flex flex-col items-start text-start max-[991px]:pb-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    Get In <span className="text-[#6c7fd8]">Touch</span>
                  </h2> 
                </div>
              </div>
            </div>
           
            <div
              className="min-[992px]:w-[100%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={600}
            >
              <div className="bb-contact-maps sticky top-[0]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.7120988320553!2d77.1312131!3d28.698257599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0151f063e0a1%3A0xf5c829e933be081d!2sPrint%20Hutt!5e0!3m2!1sen!2sin!4v1735904725123!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[320px] mb-[-10px] rounded-[20px] border-[0]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialCard />
    </>
  );
};

export default HomeComponent;