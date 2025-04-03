import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

import { sliderService } from '@/_services/common/sliderService';
import Link from 'next/link';

const HeroSlider = () => {
    const [slidersData, setSlidersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sliders = await sliderService.getAll();
                setSlidersData(sliders?.sliders || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const fail = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/1900x545.png?text=1900*550';
    };

    return (
        <>
            <div className="slider-container relative">
                {loading ? (
                    <div className="skeleton w-full h-[550px] bg-gray-200 rounded-md" />
                ) : (
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        autoplay={{ delay: 5000 }}
                        loop
                        speed={2500}
                        slidesPerView={1}
                    >
                        {slidersData.map((slider) => (
                            <SwiperSlide key={slider._id}>
                                <Link href={slider.link}>
                                    <Image
                                        src={slider.imageUrl.url}
                                        alt={slider.title}
                                        className="w-full"
                                        width={1900}
                                        height={550}
                                        placeholder="blur"
                                        blurDataURL="https://via.placeholder.com/1900x545.png?text=1900*545"
                                        onError={fail}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                        {/* Custom navigation buttons */}
                        <button className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 bg-gray-800 text-white rounded-full p-2 md:p-3 hover:bg-gray-500 transition-all z-10">
                            &#x276E;
                        </button>
                        <button className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 bg-gray-800 text-white rounded-full p-2 md:p-3 hover:bg-gray-500 transition-all z-10">
                            &#x276F;
                        </button>
                    </Swiper>
                )}
            </div>

            <div className="overflow-hidden whitespace-nowrap block md:hidden">
                <div className="animate-marquee inline-block font-Poppins font-light text-[16px] text-[#000] leading-[28px] tracking-[0.03rem]">
                    <span>30% OFF / 12000 Items Delivered / 40 Years of experience || Get extra ✨ Rs 100 off by applying coupon code FLAT100 on orders above Rs 500</span>
                </div>
            </div>
        </>
    );
};

export default HeroSlider;
