"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categoryService } from "@/_services/common/categoryService";

const CategoryHome = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoadinng] = useState(true);

  const fetchData = async () => {
    try {
      const [categories] = await Promise.all([
        categoryService.getAll('all'),
      ]);
      setCategoriesData(categories?.categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadinng(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(categoriesData)

  return (
    <>
      <section className="section-category overflow-hidden py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]">
              <div className="bb-category-img relative max-[991px]:hidden">
                <img
                  src="https://res.cloudinary.com/dkprths9f/image/upload/v1736598650/lamp-product-banner_locrte.jpg"
                  alt="category"
                  className="w-full rounded-[30px]"
                />
                <div className="bb-offers py-[5px] px-[15px] absolute top-[20px] right-[20px] bg-[#000] opacity-[0.8] rounded-[15px]">
                  <span className="text-[14px] font-normal text-[#fff]">
                    30% Off
                  </span>
                </div>
              </div>
            </div>
            <div className="min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
              <div className="bb-category-contact max-[991px]:mt-[-24px]">
                <div
                  className="mb-[30px] max-[991px]:hidden"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={600}
                >
                  <h2 className="font-quicksand text-[124px] text-[#000] opacity-[0.4] font-bold leading-[1.2] tracking-[0.03rem] max-[1399px]:text-[95px] max-[1199px]:text-[70px] max-[767px]:text-[42px] ">
                    Gifts Personalised
                  </h2>
                </div>
                <div className="bb-category-block ml-[-150px] w-[calc(100%+150px)] pt-[30px] pl-[30px] bg-[#fff] rounded-tl-[30px] relative max-[991px]:ml-[0] max-[991px]:w-full max-[991px]:p-[0]">

                  <Slider {...settings} className="category-slider">
                    {
                      loading ?
                        Array.from({ length: 6 }).map((_, index) => (
                          <div
                            key={index}
                            className="min-[1200px]:w-[16.66%] min-[768px]:w-[33.33%] min-[576px]:w-[50%] w-full px-[12px] mb-[24px]"
                          >
                            <div className="bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] bg-[#fef1f1]">
                              {/* Skeleton for Category Image */}
                              <div className="category-image mb-[12px]">
                                <div className="skeleton w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-md bg-gray-200" />
                              </div>

                              {/* Skeleton for Text */}
                              <div className="category-sub-contact w-full">
                                <div className="skeleton w-[70%] h-[16px] bg-gray-200 mx-auto mb-[8px]" />
                                <div className="skeleton w-[50%] h-[14px] bg-gray-200 mx-auto" />
                              </div>
                            </div>
                          </div>
                        ))


                        : (
                          categoriesData.map((category, index) => (
                            <div className="pr-2 pl-2" key={category._id}>
                              <div
                                className={`bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] category-items-${index + 1} ${(index % 2 === 0 ? 'bg-[#f4f1fe]' : 'bg-[#fef1f1]')}`}
                                data-aos-duration={1000}
                                data-aos-delay={(index + 1) * 200}
                              >
                                <div className="category-image mb-[12px] flex items-center justify-center">
                                  <img
                                    src={category.image.url}
                                    alt={category.name}
                                    className="w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-full"
                                  />
                                </div>
                                <div className="category-sub-contact">
                                  <h5 className="mb-[2px] text-[16px] font-quicksand text-[#3d4750] font-semibold tracking-[0.03rem] leading-[1.2]">
                                    <a
                                      href={`/category/${category.slug}`}
                                      className="font-Poppins text-[16px] font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize"
                                    >
                                      {category.name}
                                    </a>
                                  </h5>
                                  <p className="font-Poppins text-[13px] text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
                                    {category.totalProducts} items
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                  </Slider>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryHome;
