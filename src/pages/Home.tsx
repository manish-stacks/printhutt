"use client";
import React from "react";
import CategoryHome from "@/components/CategoryHome";
import ProductSlider from "@/components/ProductSlider";
import Testimonials from "@/components/Testimonials";
import BlogHome from "@/components/BlogHome";
import InstagramHome from "@/components/InstagramHome";
import NewProductArea from "@/components/NewProductArea";
import OurServices from "@/components/OurServices";
import HeroSlider from "@/components/HeroSlider";
import PersonalisedGifts from "@/components/PersonalisedGifts";



const HomeComponent = () => {

  return (
    <>
      <HeroSlider />
      {/*  Category  */}
      <CategoryHome />

      <PersonalisedGifts />
      {/* Day of the deal */}
      <section className="section-deal overflow-hidden py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div
                className="section-title bb-deal mb-[20px] pb-[20px] z-[5] relative flex justify-between max-[991px]:pb-[0] max-[991px]:flex-col max-[991px]:justify-center max-[991px]:text-center"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    Day of the <span className="text-[#6c7fd8]">deal</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Don't wait. The time will never be just right.
                  </p>
                </div>
                <div id="dealend" className="dealend-timer" />
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div className="bb-deal-slider m-[-12px]">
                <div className="bb-deal-block owl-carousel"></div>
                <ProductSlider />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner-one */}
      <section className="section-banner-one overflow-hidden py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div
              className="min-[992px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={400}
            >
              <div className="banner-box p-[30px] rounded-[20px] relative overflow-hidden bg-box-color-one bg-[#fbf2e5]">
                <div className="inner-banner-box relative z-[1] flex justify-between max-[480px]:flex-col">
                  <div className="side-image px-[12px] flex items-center max-[480px]:p-[0] max-[480px]:mb-[12px] max-[480px]:justify-center">
                    <img
                      src="https://printhutt.com/media/Acrylic-Frame.jpg"
                      alt="one"
                      className="max-w-max w-[280px] h-[280px] max-[1399px]:w-[230px] max-[1399px]:h-[230px] max-[1199px]:w-[140px] max-[1199px]:h-[140px] max-[991px]:w-[280px] max-[991px]:h-[280px] max-[767px]:h-[200px] max-[767px]:w-[200px] max-[575px]:w-full max-[575px]:h-[auto] max-[480px]:w-[calc(100%-70px)]"
                    />
                  </div>
                  <div className="inner-contact max-w-[250px] px-[12px] flex flex-col items-start justify-center max-[480px]:p-[0] max-[480px]:max-w-[100%] max-[480px]:text-center max-[480px]:items-center">
                    <h5 className="font-quicksand mb-[15px] text-[31px] text-[#3d4750] font-bold tracking-[0.03rem] text-[#3d4750] leading-[1.2] max-[991px]:text-[28px] max-[575px]:text-[24px] max-[480px]:mb-[2px] max-[480px]:text-[22px]">
                      Personalised &amp; Acrylic Frame
                    </h5>
                    <p className="font-Poppins text-[16px] font-light leading-[28px] tracking-[0.03rem] text-[#686e7d] mb-[15px] max-[480px]:mb-[8px] max-[480px]:text-[14px]">
                      The flavour of something special
                    </p>
                    <a
                      href="shop-left-sidebar-col-3.html"
                      className="bb-btn-1 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[5px] px-[15px] text-[14px] font-normal text-[#3d4750] bg-transparent rounded-[10px] border-[1px] border-solid border-[#3d4750] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-[#fff]"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="min-[992px]:w-[50%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={400}
            >
              <div className="banner-box p-[30px] rounded-[20px] relative overflow-hidden bg-box-color-two bg-[#ffe8ee]">
                <div className="inner-banner-box relative z-[1] flex justify-between max-[480px]:flex-col">
                  <div className="side-image px-[12px] flex items-center max-[480px]:p-[0] max-[480px]:mb-[12px] max-[480px]:justify-center">
                    <img
                      src="https://printhutt.com//media/table-name-lemp.png"
                      alt="two"
                      className="max-w-max w-[280px] h-[280px] max-[1399px]:w-[230px] max-[1399px]:h-[230px] max-[1199px]:w-[140px] max-[1199px]:h-[140px] max-[991px]:w-[280px] max-[991px]:h-[280px] max-[767px]:h-[200px] max-[767px]:w-[200px] max-[575px]:w-full max-[575px]:h-[auto] max-[480px]:w-[calc(100%-70px)]"
                    />
                  </div>
                  <div className="inner-contact max-w-[250px] px-[12px] flex flex-col items-start justify-center max-[480px]:p-[0] max-[480px]:max-w-[100%] max-[480px]:text-center max-[480px]:items-center">
                    <h5 className="font-quicksand mb-[15px] text-[31px] text-[#3d4750] font-bold tracking-[0.03rem] text-[#3d4750] leading-[1.2] max-[991px]:text-[28px] max-[575px]:text-[24px] max-[480px]:mb-[2px] max-[480px]:text-[22px]">
                      Personalised &amp; Table Frame
                    </h5>
                    <p className="font-Poppins text-[16px] font-light leading-[28px] tracking-[0.03rem] text-[#686e7d] mb-[15px] max-[480px]:mb-[8px] max-[480px]:text-[14px]">
                      A healthy meal for every one
                    </p>
                    <a
                      href="shop-left-sidebar-col-3.html"
                      className="bb-btn-1 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[5px] px-[15px] text-[14px] font-normal text-[#3d4750] bg-transparent rounded-[10px] border-[1px] border-solid border-[#3d4750] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-[#fff]"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner-two  */}
      <section className="section-banner-two overflow-hidden my-[50px] max-[1199px]:my-[35px] bg-[url('https://printhutt.com/image/printhutt-slider.webp')] min-h-[600px] overflow-hidden bg-no-repeat bg-cover bg-center max-[991px]:max-h-[400px] max-[991px]:min-h-[auto]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px] banner-justify-box-contact w-full h-[600px] flex justify-end items-end max-[991px]:h-[400px]">
              <div className="banner-two-box bg-[#fff] rounded-t-[30px] max-w-[400px] pt-[30px] px-[30px] flex flex-col items-start relative max-[991px]:max-w-[250px] max-[575px]:my-[0] max-[575px]:mx-[auto]">
                <span className="text-[20px] font-semibold text-[#6c7fd8] leading-[26px] max-[991px]:text-[16px]">
                  25% Off
                </span>
                <h4 className="font-quicksand mb-[20px] text-[40px] font-bold text-[#3d4750] tracking-[0.03rem] leading-[1.2] max-[991px]:text-[22px]">
                  Personalised &amp; LED Lamp
                </h4>
                <a
                  href="javascript:void(0)"
                  className="bb-btn-1 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[8px] px-[20px] max-[1199px]:py-[3px] max-[1199px]:px-[15px] text-[14px] font-normal text-[#3d4750] bg-transparent rounded-[10px] border-[1px] border-solid border-[#3d4750] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-[#fff]"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Product tab Area */}
      <NewProductArea />

      {/*  Services  */}
      <OurServices />

      {/* Pre Product */}
      <section className="section-vendors overflow-hidden pt-[50px] max-[1199px]:pt-[35px] pb-[100px] max-[1199px]:pb-[70px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="w-full px-[12px]">
              <div
                className="section-title mb-[20px] pb-[20px] z-[5] relative flex flex-col items-center text-center max-[991px]:pb-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    Top{" "}
                    <span className="text-[#6c7fd8]">Pre Design Product</span>
                  </h2>
                  <p className="font-Poppins max-w-[600px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Explore the trendiest products at PrintHutt and bring them
                    home to decorate your space!
                  </p>
                </div>
              </div>
            </div>
            <div
              className="min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={200}
            >
              <div className="bb-vendors-img sticky top-[0]">
                <div className="tab-content">
                  <div className="tab-vendors-pane" id="vendors_tab_one">
                    <a
                      href="javascript:void(0)"
                      className="bb-vendor-init transition-all duration-[0.3s] ease-in-out absolute right-[20px] top-[20px] h-[35px] w-[35px] bg-[#00000080] hover:bg-[#000000cc] flex justify-center items-center rounded-[10px]"
                    >
                      <i className="ri-arrow-right-up-line text-[20px] text-[#fff]" />
                    </a>
                    <img
                      src="https://printhutt.com/media/imgpsh_fullsize_anim.jfif"
                      alt="vendors-img-1"
                      className="w-full rounded-[30px] border-[1px] border-solid border-[#eee]"
                    />
                    <div className="vendors-local-shape absolute bottom-[0] right-[0] h-[120px] w-[120px] bg-[#fff] pt-[20px] pl-[20px] rounded-tl-[30px]">
                      <div className="inner-shape relative" />
                      <img
                        src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/vendors/vendor-1.jpg"
                        alt="vendor"
                        className="w-[100px] h-[100px] rounded-[30px] border-[1px] border-solid border-[#eee]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
              <ul
                className="bb-vendors-tab-nav flex flex-wrap mb-[-24px]"
                id="vendorstab"
              >
                <li
                  className="nav-item w-full mb-[24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={200}
                >
                  <a
                    className="nav-link p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[30px] block"
                    href="#vendors_tab_one"
                  >
                    <div className="bb-vendors-box">
                      <div className="inner-heading mb-[5px] flex justify-between max-[420px]:flex-col">
                        <h5 className="font-quicksand text-[18px] font-bold tracking-[0.03rem] leading-[1.2] text-[#3d4750]">
                          Fridge Magnet
                        </h5>
                        <span className="font-Poppins text-[14px] text-[#686e7d] leading-[28px] font-normal tracking-[0.03rem]">
                          Sales - 587
                        </span>
                      </div>
                      <p className="font-Poppins text-[14px] leading-[20px] text-[#686e7d] font-light tracking-[0.03rem]">
                        Magnet (5) | Acrylic (30)
                      </p>
                    </div>
                  </a>
                </li>
                <li
                  className="nav-item w-full mb-[24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={400}
                >
                  <a
                    className="nav-link p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[30px] block"
                    href="#vendors_tab_two"
                  >
                    <div className="bb-vendors-box">
                      <div className="inner-heading mb-[5px] flex justify-between max-[420px]:flex-col">
                        <h5 className="font-quicksand text-[18px] font-bold tracking-[0.03rem] leading-[1.2] text-[#3d4750]">
                          Name Plate
                        </h5>
                        <span className="font-Poppins text-[14px] text-[#686e7d] leading-[28px] font-normal tracking-[0.03rem]">
                          Sales - 428
                        </span>
                      </div>
                      <p className="font-Poppins text-[14px] leading-[20px] text-[#686e7d] font-light tracking-[0.03rem]">
                        Name Plate (8) | Lamp (15) | Fridge Magnet (04){" "}
                      </p>
                    </div>
                  </a>
                </li>
                <li
                  className="nav-item w-full mb-[24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={600}
                >
                  <a
                    className="nav-link p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[30px] block"
                    href="#vendors_tab_three"
                  >
                    <div className="bb-vendors-box">
                      <div className="inner-heading mb-[5px] flex justify-between max-[420px]:flex-col">
                        <h5 className="font-quicksand text-[18px] font-bold tracking-[0.03rem] leading-[1.2] text-[#3d4750]">
                          Neon
                        </h5>
                        <span className="font-Poppins text-[14px] text-[#686e7d] leading-[28px] font-normal tracking-[0.03rem]">
                          Sales - 1024
                        </span>
                      </div>
                      <p className="font-Poppins text-[14px] leading-[20px] text-[#686e7d] font-light tracking-[0.03rem]">
                        Name Plate (16) | Lamp (42) | Fridge Magnet (18){" "}
                      </p>
                    </div>
                  </a>
                </li>
                <li
                  className="nav-item w-full mb-[24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={800}
                >
                  <a
                    className="nav-link p-[30px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[30px] block"
                    href="#vendors_tab_four"
                  >
                    <div className="bb-vendors-box">
                      <div className="inner-heading mb-[5px] flex justify-between max-[420px]:flex-col">
                        <h5 className="font-quicksand text-[18px] font-bold tracking-[0.03rem] leading-[1.2] text-[#3d4750]">
                          Key Chain
                        </h5>
                        <span className="font-Poppins text-[14px] text-[#686e7d] leading-[28px] font-normal tracking-[0.03rem]">
                          Sales - 210
                        </span>
                      </div>
                      <p className="font-Poppins text-[14px] leading-[20px] text-[#686e7d] font-light tracking-[0.03rem]">
                        Acrylic Keychains (2) | Wooden Keychain (10)
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Blog */}
      <BlogHome />

      {/* Instagram */}
      <InstagramHome />
    </>
  );
};

export default HomeComponent;