"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { categoryService } from "@/_services/common/categoryService";
import Link from "next/link";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: {
    url: string;
  };
  totalProducts: number;
}

const CategoryHome = () => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await categoryService.getAll('all');
      setCategoriesData(response?.categories || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="py-10 md:py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Image Column */}
          <div className="lg:col-span-5">
            <Link href="/product/customize-neon-sign">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  width={525}
                  height={525}
                  src="https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/customize-neon-sign_kbykjt.jpg"
                  alt="category"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/80 py-1 px-4 rounded-full">
                  <span className="text-sm text-white">30% Off</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              
              <div className="text-center lg:text-left">
                <h1 className="font-['Buttervill'] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-rose-900">
                  Featured Categories
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto lg:mx-0 mt-14">
                  Transform your photos into beautiful personalized products. Light up your memories with our exclusive illuminated products.
                </p>
              </div>

              <div className="relative mt-8">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={16}
                  slidesPerView="auto"
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 12 },
                    640: { slidesPerView: 3, spaceBetween: 16 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  className="!p-2"
                >
                  {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <SwiperSlide
                        key={index}
                        className="!w-[calc(50%-6px)] sm:!w-[calc(33.333%-8px)] lg:!w-[calc(25%-12px)]"
                      >
                        <div className="bg-gray-100 p-4 rounded-xl animate-pulse">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    categoriesData.map((category, index) => (
                      <SwiperSlide
                        key={category._id}
                        className="!w-[calc(50%-6px)] sm:!w-[calc(33.333%-8px)] lg:!w-[calc(25%-12px)]"
                      >
                        <Link href={`/category/${category.slug}`}>
                          <div
                            className={`p-4 rounded-xl transition-transform hover:scale-105 ${
                              index % 2 === 0 ? 'bg-[#f4f1fe]' : 'bg-[#fef1f1]'
                            }`}
                          >
                            <Image
                              height={64}
                              width={64}
                              src={category.image.url}
                              alt={category.name}
                              className="w-16 h-16 mx-auto mb-3 rounded-lg object-cover"
                            />
                            <h5 className="text-gray-800 font-semibold text-sm md:text-base mb-1 capitalize text-center">
                              {category.name}
                            </h5>
                            <p className="text-gray-500 text-xs md:text-sm text-center">
                              {category.totalProducts} items
                            </p>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHome;
