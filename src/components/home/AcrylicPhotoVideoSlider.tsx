"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Link from "next/link";

const AcrylicPhotoVideoSlider = () => {
    const [activeIndex, setActiveIndex] = useState(1); // Start with index 1
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const swiperRef = useRef<SwiperType | null>(null);

    const videos = [
        { url: "/product-details/led-photo-rolling-dice", video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_9.11.26_PM_online-video-cutter.com_1_yq8a8p.mp4" },
        { url: "/product-details/customize-acrylic-full-photo-frame-a4-size", video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.58.10_AM_iyvpqf.mp4" },
        { url: "/product-details/led-photo-rolling-dice", video: "https://cloudify.printhutt.com/video/WhatsApp%20Video%202025-03-22%20at%206.10.05%20PM.mp4" },
        { url: "/category/lamps/couple-lamp", video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.51.09_AM_kc8lja.mp4" },
        { url: "/product-details/customized-name-led-lamp", video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_11.41.08_AM_aeu7jl.mp4" },
        { url: "/product-details/personalized-acrylic-cutout-photo-led-lamp", video: "https://cloudify.printhutt.com/video/WhatsApp_Video_2025-03-01_at_6.03.50_PM_l0wwwy.mp4" },
    ];

    const handleSlideChange = (swiper: SwiperType) => {
        videoRefs.current.forEach((video) => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        const activeVideo = videoRefs.current[swiper.activeIndex];
        if (activeVideo) {
            const playPromise = activeVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("Autoplay prevented:", error);
                    // Try playing again with user interaction
                    document.addEventListener('click', () => {
                        activeVideo.play();
                    }, { once: true });
                });
            }
        }

        setActiveIndex(swiper.activeIndex);
    };

    useEffect(() => {
        // Play the second video on mount with improved handling
        const timeout = setTimeout(() => {
            const video = videoRefs.current[1];
            if (video) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.log("Initial autoplay error:", error);
                        // Add click-to-play fallback
                        document.addEventListener('click', () => {
                            video.play();
                        }, { once: true });
                    });
                }
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="to-gray-900 bg-violet-100 py-10">
            <div className="max-w-7xl  mx-auto px-4">


                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    initialSlide={1}
                    coverflowEffect={{
                        rotate: 35,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    className="!pb-16"
                >
                    {videos.map((video, index) => (
                        <SwiperSlide
                            key={index}
                            className={`
                                !w-[300px] !h-[400px] 
                                sm:!w-[400px] sm:!h-[500px] 
                                lg:!w-[400px] lg:!h-[450px]
                                transition-all duration-500
                            `}
                        >
                            <div
                                className={`
                                    relative w-full h-full rounded-xl overflow-hidden
                                    transform transition-all duration-500 
                                    ${activeIndex === index ? "scale-105" : "scale-95 opacity-100"}
                                    group
                                `}
                            >
                                <Link href={video.url}>
                                    <video
                                        //ref={(el) => (videoRefs.current[index] = el)}
                                        ref={(el) => {
                                            videoRefs.current[index] = el;
                                            if (el) {
                                                el.onended = () => {
                                                    el.currentTime = 0;
                                                    el.play();
                                                };
                                            }
                                        }}
                                        className="w-full h-full object-contain rounded-pill relative z-10"
                                        playsInline
                                        muted
                                        loop
                                        autoPlay
                                        preload="auto"
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

export default AcrylicPhotoVideoSlider;
