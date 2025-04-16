"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
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

  const neonImage = [
    "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664963/lamp-product-banner_locrte_peorfc.jpg",
    "https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664964/pre-product-banner_ndont2_xa92yn.jpg"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % neonImage.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [neonImage.length]);

  return (
    <section className="section-category overflow-hidden py-[50px] max-[1199px]:py-[35px]">
      <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div className="flex flex-wrap w-full mb-[-24px]">
          <div className="min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]">
            <div className="bb-category-img relative max-[991px]:hidden">
              <Image
                width={525}
                height={525}
                src={neonImage[currentImageIndex]}
                alt="category"
                className="w-full rounded-[30px]"
              />
              <div className="bb-offers py-[5px] px-[15px] absolute top-[20px] right-[20px] bg-[#000] opacity-[0.8] rounded-[15px]">
                <span className="text-[14px] font-normal text-[#fff]">30% Off</span>
              </div>
            </div>
          </div>
          <div className="min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
            <div className="bb-category-contact max-[991px]:mt-[-24px]">
              {/* <div className="mb-[30px] max-[991px]:hidden">
                <h2 className="font-quicksand text-[124px] text-fuchsia-900 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] font-bold leading-[1.2] tracking-[0.03rem] max-[1399px]:text-[95px] max-[1199px]:text-[70px] max-[767px]:text-[42px]">
                  Personalised Gifts
                </h2>
              </div> */}
              <div className="text-start mb-12">
                <h1 className="text-[110px] font-bold text-rose-900 my-4" style={{ fontFamily: "Buttervill" }}>Featured Categories</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-8">
                  Transform your photos into beautiful personalized products,Light up your memories with our exclusive illuminated products
                </p>
              </div>
              <div className="bb-category-block w-[calc(100%+150px)] pt-[30px] pl-[30px] bg-[#fff] rounded-tl-[30px] relative max-[991px]:ml-[0] max-[991px]:w-full max-[991px]:p-[0]">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={20}
                  slidesPerView={4}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                    1400: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <SwiperSlide key={index}>
                        <div className="bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] bg-[#fef1f1]">
                          <div className="category-image mb-[12px]">
                            <div className="skeleton w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-md bg-gray-200" />
                          </div>
                          <div className="category-sub-contact w-full">
                            <div className="skeleton w-[70%] h-[16px] bg-gray-200 mx-auto mb-[8px]" />
                            <div className="skeleton w-[50%] h-[14px] bg-gray-200 mx-auto" />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    categoriesData.map((category, index) => (
                      <SwiperSlide key={category._id}>
                        <Link
                          href={`/category/${category.slug}`} >
                          <div className={`bb-category-box p-[30px] max-[567px]:p-[5px] rounded-lg flex flex-col items-center text-center max-[1399px]:p-[20px] category-items-${index + 1} ${index % 2 === 0 ? 'bg-[#f4f1fe]' : 'bg-[#fef1f1]'}`}>
                            <div className="category-image mb-[12px] flex items-center justify-center">
                              <Image
                                height={50}
                                width={50}
                                src={category.image.url}
                                alt={category.name}
                                className="w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-md"
                              />
                            </div>
                            <div className="category-sub-contact">
                              <h5 className="mb-[2px] text-[16px] font-quicksand text-[#3d4750] font-semibold tracking-[0.03rem] leading-[1.2]">
                                <span
                                  className="font-Poppins text-[16px] font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize"
                                >
                                  {category.name}
                                </span>
                              </h5>
                              <p className="font-Poppins text-[13px] text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
                                {category.totalProducts} items
                              </p>
                            </div>
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
    </section >
  );
};

export default CategoryHome;
