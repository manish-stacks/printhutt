"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import Link from "next/link";

const InstagramStyleVideoGrid = () => {
    const videos = [
        {
            url: "/product-details/customized-wall-photo-frame-acrylic--acrylic-photo-frame",
            video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_9.11.26_PM_online-video-cutter.com_1_yq8a8p.mp4"
        },
        {
            url: "/product-details/customize-acrylic-full-photo-frame-a4-size",
            video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.58.10_AM_iyvpqf.mp4"
        },
        {
            url: "/product-details/led-photo-rolling-dice",
            video: "https://cloudify.printhutt.com/video/WhatsApp%20Video%202025-03-22%20at%206.10.05%20PM.mp4"
        },
        {
            url: "/category/lamps/couple-lamp",
            video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.51.09_AM_kc8lja.mp4"
        },
        {
            url: "/product-details/customized-name-led-lamp",
            video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.41.08_AM_aeu7jl.mp4"
        },
        {
            url: "/product-details/personalized-acrylic-cutout-photo-led-lamp",
            video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_6.03.50_PM_l0wwwy.mp4"
        },
    ];

    return (
        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                >
                    {videos.map((video, index) => (
                        <SwiperSlide key={index}>
                            <div className="aspect-square relative overflow-hidden rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                                <Link href={video.url} className="block w-full h-full">
                                    <video
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        src={video.video}
                                    >
                                        <source src={video.video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default InstagramStyleVideoGrid;
