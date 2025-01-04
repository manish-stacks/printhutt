"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  return (
    <>
      <section className="section-category overflow-hidden py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]">
              <div className="bb-category-img relative max-[991px]:hidden">
                <img
                  src="https://printhutt.com/media/1.webp"
                  alt="category"
                  className="w-full rounded-[30px]"
                />
                <div className="bb-offers py-[5px] px-[15px] absolute top-[20px] right-[20px] bg-[#000] opacity-[0.8] rounded-[15px]">
                  <span className="text-[14px] font-normal text-[#fff]">
                    50% Off
                  </span>
                </div>
              </div>
            </div>
            <div className="min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
              <div className="bb-category-contact max-[991px]:mt-[-24px]">
                <div
                  className="category-title mb-[30px] max-[991px]:hidden"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={600}
                >
                  <h2 className="font-quicksand text-[124px] text-[#fff] opacity-[0.15] font-bold leading-[1.2] tracking-[0.03rem] max-[1399px]:text-[95px] max-[1199px]:text-[70px] max-[767px]:text-[42px]">
                  Gifts Personalised 
                  </h2>
                </div>
                <div className="bb-category-block ml-[-150px] w-[calc(100%+150px)] pt-[30px] pl-[30px] bg-[#fff] rounded-tl-[30px] relative max-[991px]:ml-[0] max-[991px]:w-full max-[991px]:p-[0]">
                  <Slider {...settings} className="category-slider">
                    <div className="pr-2 pl-2">
                      <div
                        className="bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] category-items-1 bg-[#fef1f1]"
                        data-aos="flip-left"
                        data-aos-duration={1000}
                        data-aos-delay={200}
                      >
                        <div className="category-image mb-[12px] flex items-center justify-center">
                          <img
                            src="https://printhutt.com/media/3d-name-lemp.jpg"
                            alt="category"
                            className="w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-full"
                          />
                        </div>
                        <div className="category-sub-contact">
                          <h5 className="mb-[2px] text-[16px] font-quicksand text-[#3d4750] font-semibold tracking-[0.03rem] leading-[1.2]">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="font-Poppins text-[16px] font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize"
                            >
                              LED Lamp
                            </a>
                          </h5>
                          <p className="font-Poppins text-[13px] text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
                            1 items
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pr-2 pl-2">
                      <div
                        className="bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] category-items-2 bg-[#e1fcf2]"
                        data-aos="flip-left"
                        data-aos-duration={1000}
                        data-aos-delay={400}
                      >
                        <div className="category-image mb-[12px] flex items-center justify-center">
                          <img
                            src="https://printhutt.com/media/lemps.jpg"
                            alt="category"
                            className="w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-full"
                          />
                        </div>
                        <div className="category-sub-contact">
                          <h5 className="mb-[2px] text-[16px] font-quicksand text-[#3d4750] font-semibold tracking-[0.03rem] leading-[1.2]">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="font-Poppins text-[16px] font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize"
                            >
                              Acrylic Lamp
                            </a>
                          </h5>
                          <p className="font-Poppins text-[13px] text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
                            1 items
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pr-2 pl-2">
                      <div
                        className="bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] category-items-3 bg-[#f4f1fe]"
                        data-aos="flip-left"
                        data-aos-duration={1000}
                        data-aos-delay={600}
                      >
                        <div className="category-image mb-[12px] flex items-center justify-center">
                          <img
                            src="https://printhutt.com/media/led-lemp.jpg"
                            alt="category"
                            className="w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-full"
                          />
                        </div>
                        <div className="category-sub-contact">
                          <h5 className="mb-[2px] text-[16px] font-quicksand text-[#3d4750] font-semibold tracking-[0.03rem] leading-[1.2]">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="font-Poppins text-[16px] font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize"
                            >
                              Photo Acrylic
                            </a>
                          </h5>
                          <p className="font-Poppins text-[13px] text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
                            1 items
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pr-2 pl-2">
                      <div
                        className="bb-category-box p-[30px] rounded-[20px] flex flex-col items-center text-center max-[1399px]:p-[20px] category-items-4 bg-[#fbf9e4]"
                        data-aos="flip-left"
                        data-aos-duration={1000}
                        data-aos-delay={800}
                      >
                        <div className="category-image mb-[12px] flex items-center justify-center">
                          <img
                            src="https://printhutt.com/media/product/761168274_Raisen-Names-Lamps-3.jpg"
                            alt="category"
                            className="w-[50px] h-[50px] max-[1399px]:h-[65px] max-[1399px]:w-[65px] max-[1199px]:h-[50px] max-[1199px]:w-[50px] rounded-full"
                          />
                        </div>
                        <div className="category-sub-contact">
                          <h5 className="mb-[2px] text-[16px] font-quicksand text-[#3d4750] font-semibold tracking-[0.03rem] leading-[1.2]">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="font-Poppins text-[16px] font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize"
                            >
                              Raisen Lamps
                            </a>
                          </h5>
                          <p className="font-Poppins text-[13px] text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
                            1 items
                          </p>
                        </div>
                      </div>
                    </div>
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
