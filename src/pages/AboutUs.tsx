"use client";
import React from "react";
import OurServices from "@/components/OurServices";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Breadcrumb from "@/components/Breadcrumb";

export const AboutUs = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"About Us"} />

      {/* About */}
      <section className="section-about py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="min-[992px]:w-[50%] w-full px-[12px] mb-[24px]">
              <div className="bb-about-img sticky top-[0]">
                <img
                  src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/about/one.png"
                  alt="about-one"
                  className="w-full"
                />
              </div>
            </div>
            <div className="min-[992px]:w-[50%] w-full mb-[24px]">
              <div className="bb-about-contact h-full flex flex-col justify-center">
                <div
                  className="section-title pb-[12px] px-[12px] flex justify-start max-[991px]:flex-col max-[991px]:justify-center max-[991px]:text-center"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={200}
                >
                  <div className="section-detail max-[991px]:mb-[12px]">
                    <h2 className="bb-title font-quicksand tracking-[0.03rem] mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] inline capitalize leading-[1] max-[767px]:text-[23px]">
                      About the{" "}
                      <span className="text-[#6c7fd8]">BlueBerry</span>
                    </h2>
                  </div>
                </div>
                <div
                  className="about-inner-contact px-[12px] mb-[14px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={400}
                >
                  <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] mb-[20px] text-[18px] text-[#3d4750] font-bold italic">
                    Farm-fresh Goodness, just a click Away.
                  </h4>
                  <p className="font-Poppins mb-[16px] text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Reprehenderit, rem! Et obcaecati rem nulla, aut assumenda
                    unde minima earum distinctio porro excepturi veritatis
                    officiis dolorem quod. sapiente amet rerum beatae
                    dignissimos aperiam id quae quia velit. Ab optio doloribus
                    hic quas sit corporis numquam.
                  </p>
                  <p className="font-Poppins mb-[16px] text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Reprehenderit, rem! Et obcaecati rem nulla, aut assumenda
                    unde minima earum distinctio porro excepturi veritatis
                    officiis dolorem quod. sapiente amet rerum beatae
                    dignissimos aperiam id quae quia velit. Ab optio doloribus
                    hic quas sit corporis numquam.
                  </p>
                </div>
                <div
                  className="bb-vendor-rows flex flex-wrap w-full mb-[-24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={600}
                >
                  <div className="min-[576px]:w-[33.33%] w-full px-[12px] mb-[24px]">
                    <div className="bb-vendor-box p-[20px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-count mb-[12px] max-[1399px]:mb-[8px]">
                        <h5 className="counter font-quicksand tracking-[0.03rem] text-[32px] leading-[24px] text-[#3d4750] font-bold max-[1399px]:text-[28px] text-center">
                          200 +
                        </h5>
                      </div>
                      <div className="inner-text">
                        <p className="font-Poppins font-light tracking-[0.03rem] text-[14px] leading-[18px] text-[#686e7d] mb-[0] text-center">
                          vendors
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="min-[576px]:w-[33.33%] w-full px-[12px] mb-[24px]">
                    <div className="bb-vendor-box p-[20px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-count mb-[12px] max-[1399px]:mb-[8px]">
                        <h5 className="counter font-quicksand tracking-[0.03rem] text-[32px] leading-[24px] text-[#3d4750] font-bold max-[1399px]:text-[28px] text-center">
                          654k +
                        </h5>
                      </div>
                      <div className="inner-text">
                        <p className="font-Poppins font-light tracking-[0.03rem] text-[14px] leading-[18px] text-[#686e7d] mb-[0] text-center">
                          Sales
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="min-[576px]:w-[33.33%] w-full px-[12px] mb-[24px]">
                    <div className="bb-vendor-box p-[20px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-count mb-[12px] max-[1399px]:mb-[8px]">
                        <h5 className="counter font-quicksand tracking-[0.03rem] text-[32px] leading-[24px] text-[#3d4750] font-bold max-[1399px]:text-[28px] text-center">
                          587k +
                        </h5>
                      </div>
                      <div className="inner-text">
                        <p className="font-Poppins font-light tracking-[0.03rem] text-[14px] leading-[18px] text-[#686e7d] mb-[0] text-center">
                          Customers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurServices />
      <Testimonials />

      {/* Team */}
      <Team />
    </>
  );
};
