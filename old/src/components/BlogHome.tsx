import React from "react";
import Slider from "react-slick";

const BlogHome = () => {
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="section-blog overflow-hidden pb-[50px] max-[1199px]:pb-[35px] pt-[100px] max-[1199px]:pt-[70px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div className="blog-2-slider">
                <Slider {...settings}>
                  <div className="px-2">
                    <div
                      className="blog-2-card relative overflow-hidden rounded-[30px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={200}
                    >
                      <div className="blog-img">
                        <img
                          src="https://printhutt.com//media/table-name-lemp.png"
                          alt="blog-7"
                          className="transition-all duration-[0.3s] ease-in-out w-full block"
                        />
                      </div>
                      <div className="blog-contact transition-all duration-[0.3s] ease-in-out m-[5px] p-[15px] absolute bottom-[0] right-[0] left-[0] bg-[#ffffffe6] rounded-[30px]">
                        <span className="font-Poppins font-normal text-[13px] leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          June 30,2024 - organic
                        </span>
                        <h4 className="text-[16px] leading-[1.2]">
                          <a
                            href="blog-detail-left-sidebar.html"
                            className="font-Poppins tracking-[0.03rem] text-[16px] font-medium leading-[1.3] text-[#3d4750]"
                          >
                            Marketing Guide: 5 Steps to Success.
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="blog-2-card relative overflow-hidden rounded-[30px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={400}
                    >
                      <div className="blog-img">
                        <img
                          src="https://printhutt.com//media/table-name-lemp.png"
                          alt="blog-8"
                          className="transition-all duration-[0.3s] ease-in-out w-full block"
                        />
                      </div>
                      <div className="blog-contact transition-all duration-[0.3s] ease-in-out m-[5px] p-[15px] absolute bottom-[0] right-[0] left-[0] bg-[#ffffffe6] rounded-[30px]">
                        <span className="font-Poppins font-normal text-[13px] leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          May 10,2023 - organic
                        </span>
                        <h4 className="text-[16px] leading-[1.2]">
                          <a
                            href="blog-detail-left-sidebar.html"
                            className="font-Poppins tracking-[0.03rem] text-[16px] font-medium leading-[1.3] text-[#3d4750]"
                          >
                            Best way to solve business deal issue.
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="blog-2-card relative overflow-hidden rounded-[30px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={600}
                    >
                      <div className="blog-img">
                        <img
                          src="https://printhutt.com//media/table-name-lemp.png"
                          alt="blog-9"
                          className="transition-all duration-[0.3s] ease-in-out w-full block"
                        />
                      </div>
                      <div className="blog-contact transition-all duration-[0.3s] ease-in-out m-[5px] p-[15px] absolute bottom-[0] right-[0] left-[0] bg-[#ffffffe6] rounded-[30px]">
                        <span className="font-Poppins font-normal text-[13px] leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          Jan 10,2022 - organic
                        </span>
                        <h4 className="text-[16px] leading-[1.2]">
                          <a
                            href="blog-detail-left-sidebar.html"
                            className="font-Poppins tracking-[0.03rem] text-[16px] font-medium leading-[1.3] text-[#3d4750]"
                          >
                            Business ideas to grow your business.
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="blog-2-card relative overflow-hidden rounded-[30px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={800}
                    >
                      <div className="blog-img">
                        <img
                          src="https://printhutt.com//media/table-name-lemp.png"
                          alt="blog-10"
                          className="transition-all duration-[0.3s] ease-in-out w-full block"
                        />
                      </div>
                      <div className="blog-contact transition-all duration-[0.3s] ease-in-out m-[5px] p-[15px] absolute bottom-[0] right-[0] left-[0] bg-[#ffffffe6] rounded-[30px]">
                        <span className="font-Poppins font-normal text-[13px] leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          Feb 12,2022 - organic
                        </span>
                        <h4 className="text-[16px] leading-[1.2]">
                          <a
                            href="blog-detail-left-sidebar.html"
                            className="font-Poppins tracking-[0.03rem] text-[16px] font-medium leading-[1.3] text-[#3d4750]"
                          >
                            31 customer stats know in 2020.
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogHome;
