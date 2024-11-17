import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const Blog = () => {
  return (
    <>
      <Breadcrumb title={"Blog"} />

      <section className="section-blog py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div
              className="min-[992px]:w-[33.33%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={200}
            >
              <div className="bb-blog-card bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                <div className="blog-image">
                  <img
                    src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/1.jpg"
                    alt="blog-1"
                    className="w-full rounded-tl-[20px] rounded-tr-[20px]"
                  />
                </div>
                <div className="blog-contact p-[20px]">
                  <h5 className="mb-[12px] text-[18px] leading-[1.2]">
                    <a
                      href="javascript:void(0)"
                      className="font-Poppins leading-[28px] tracking-[0.03rem] text-[18px] font-medium text-[#3d4750]"
                    >
                      Marketing Guide: 5 Steps to Success.
                    </a>
                  </h5>
                  <p className="font-Poppins tracking-[0.03rem] mb-[12px] text-[14px] leading-[26px] font-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dicta ab illum maiores error neque amet rem quod
                    consequuntur? Iste, rerum.
                  </p>
                  <div className="blog-btn flex">
                    <a
                      href="blog-detail-left-sidebar.html"
                      className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[14px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="min-[992px]:w-[33.33%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={400}
            >
              <div className="bb-blog-card bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                <div className="blog-image">
                  <img
                    src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/2.jpg"
                    alt="blog-2"
                    className="w-full rounded-tl-[20px] rounded-tr-[20px]"
                  />
                </div>
                <div className="blog-contact p-[20px]">
                  <h5 className="mb-[12px] text-[18px] leading-[1.2]">
                    <a
                      href="javascript:void(0)"
                      className="font-Poppins leading-[28px] tracking-[0.03rem] text-[18px] font-medium text-[#3d4750]"
                    >
                      Best way to solve business deal issue.
                    </a>
                  </h5>
                  <p className="font-Poppins tracking-[0.03rem] mb-[12px] text-[14px] leading-[26px] font-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dicta ab illum maiores error neque amet rem quod
                    consequuntur? Iste, rerum.
                  </p>
                  <div className="blog-btn flex">
                    <a
                      href="blog-detail-left-sidebar.html"
                      className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[14px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="min-[992px]:w-[33.33%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={600}
            >
              <div className="bb-blog-card bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                <div className="blog-image">
                  <img
                    src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/3.jpg"
                    alt="blog-3"
                    className="w-full rounded-tl-[20px] rounded-tr-[20px]"
                  />
                </div>
                <div className="blog-contact p-[20px]">
                  <h5 className="mb-[12px] text-[18px] leading-[1.2]">
                    <a
                      href="javascript:void(0)"
                      className="font-Poppins leading-[28px] tracking-[0.03rem] text-[18px] font-medium text-[#3d4750]"
                    >
                      31 customer stats know in 2019.
                    </a>
                  </h5>
                  <p className="font-Poppins tracking-[0.03rem] mb-[12px] text-[14px] leading-[26px] font-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dicta ab illum maiores error neque amet rem quod
                    consequuntur? Iste, rerum.
                  </p>
                  <div className="blog-btn flex">
                    <a
                      href="blog-detail-left-sidebar.html"
                      className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[14px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="min-[992px]:w-[33.33%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={200}
            >
              <div className="bb-blog-card bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                <div className="blog-image">
                  <img
                    src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/4.jpg"
                    alt="blog-4"
                    className="w-full rounded-tl-[20px] rounded-tr-[20px]"
                  />
                </div>
                <div className="blog-contact p-[20px]">
                  <h5 className="mb-[12px] text-[18px] leading-[1.2]">
                    <a
                      href="javascript:void(0)"
                      className="font-Poppins leading-[28px] tracking-[0.03rem] text-[18px] font-medium text-[#3d4750]"
                    >
                      Business ideas to grow your business.
                    </a>
                  </h5>
                  <p className="font-Poppins tracking-[0.03rem] mb-[12px] text-[14px] leading-[26px] font-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dicta ab illum maiores error neque amet rem quod
                    consequuntur? Iste, rerum.
                  </p>
                  <div className="blog-btn flex">
                    <a
                      href="blog-detail-left-sidebar.html"
                      className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[14px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="min-[992px]:w-[33.33%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={400}
            >
              <div className="bb-blog-card bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                <div className="blog-image">
                  <img
                    src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/5.jpg"
                    alt="blog-5"
                    className="w-full rounded-tl-[20px] rounded-tr-[20px]"
                  />
                </div>
                <div className="blog-contact p-[20px]">
                  <h5 className="mb-[12px] text-[18px] leading-[1.2]">
                    <a
                      href="javascript:void(0)"
                      className="font-Poppins leading-[28px] tracking-[0.03rem] text-[18px] font-medium text-[#3d4750]"
                    >
                      Marketing Guide: 5 Steps to Success.
                    </a>
                  </h5>
                  <p className="font-Poppins tracking-[0.03rem] mb-[12px] text-[14px] leading-[26px] font-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dicta ab illum maiores error neque amet rem quod
                    consequuntur? Iste, rerum.
                  </p>
                  <div className="blog-btn flex">
                    <a
                      href="blog-detail-left-sidebar.html"
                      className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[14px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="min-[992px]:w-[33.33%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={600}
            >
              <div className="bb-blog-card bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                <div className="blog-image">
                  <img
                    src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/blog/6.jpg"
                    alt="blog-6"
                    className="w-full rounded-tl-[20px] rounded-tr-[20px]"
                  />
                </div>
                <div className="blog-contact p-[20px]">
                  <h5 className="mb-[12px] text-[18px] leading-[1.2]">
                    <a
                      href="javascript:void(0)"
                      className="font-Poppins leading-[28px] tracking-[0.03rem] text-[18px] font-medium text-[#3d4750]"
                    >
                      31 customer stats know in 2019.
                    </a>
                  </h5>
                  <p className="font-Poppins tracking-[0.03rem] mb-[12px] text-[14px] leading-[26px] font-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dicta ab illum maiores error neque amet rem quod
                    consequuntur? Iste, rerum.
                  </p>
                  <div className="blog-btn flex">
                    <a
                      href="blog-detail-left-sidebar.html"
                      className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[14px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div className="bb-pro-pagination mb-[24px] flex justify-between max-[575px]:flex-col max-[575px]:items-center">
                <p className="font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem] max-[575px]:mb-[10px]">
                  Showing 1-12 of 21 item(s)
                </p>
                <ul className="flex">
                  <li className="leading-[28px] mr-[6px] active">
                    <a
                      href="javascript:void(0)"
                      className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                    >
                      1
                    </a>
                  </li>
                  <li className="leading-[28px] mr-[6px]">
                    <a
                      href="javascript:void(0)"
                      className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                    >
                      2
                    </a>
                  </li>
                  <li className="leading-[28px] mr-[6px]">
                    <a
                      href="javascript:void(0)"
                      className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                    >
                      3
                    </a>
                  </li>
                  <li className="leading-[28px] mr-[6px]">
                    <a
                      href="javascript:void(0)"
                      className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                    >
                      4
                    </a>
                  </li>
                  <li className="leading-[28px]">
                    <a
                      href="javascript:void(0)"
                      className="next transition-all duration-[0.3s] ease-in-out w-[auto] h-[32px] px-[13px] font-light text-[#fff] leading-[30px] bg-[#3d4750] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee]"
                    >
                      Next{" "}
                      <i className="ri-arrow-right-s-line transition-all duration-[0.3s] ease-in-out ml-[10px] text-[16px] w-[8px] text-[#fff]" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
