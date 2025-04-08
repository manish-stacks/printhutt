import { testimonialService } from "@/_services/common/testimonialService";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Testimonials = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await testimonialService.getAll();
        setTestimonialData(response?.testimonials || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // console.log(testimonialData)
  return (
    <>

      <section className="section-testimonials overflow-hidden py-[100px] max-[1199px]:py-[70px] max-[991px]:p-[0] md:hidden">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div
                className="bb-testimonials relative"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={400}
              >
                <img                  src="https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664959/img-1_c8z1ur_ykaprj.png"
                  alt="testimonials-1"
                  className="testimonials-img-1 z-[-1] h-[70px] w-[70px] absolute top-[0] left-[25px] rounded-[20px] rotate-[-10deg] max-[1399px]:h-[60px] max-[1399px]:w-[60px] max-[1399px]:left-[10px] max-[1199px]:hidden"
                />
                <img                  src="https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664959/img-2_pp7g1w_xifigy.png"
                  alt="testimonials-2"
                  className="testimonials-img-2 z-[-1] h-[50px] w-[50px] absolute bottom-[0] left-[0] rounded-[15px] rotate-[15deg] blur-[3px] max-[1199px]:hidden"
                />
                <img                  src="https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664961/img-3_axzdc6_bpvq4j.png"
                  alt="testimonials-3"
                  className="testimonials-img-3 z-[-1] h-[60px] w-[60px] absolute top-[-50px] right-[500px] rounded-[20px] rotate-[-30deg] blur-[3px] max-[991px]:hidden"
                />
                <img                  src="https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664961/img-4_uhbtpn_drhqak.png"
                  alt="testimonials-4"
                  className="testimonials-img-4 z-[-1] h-[60px] w-[60px] absolute top-[50px] right-[250px] rounded-[20px] rotate-[15deg] max-[1399px]:top-[20px] max-[991px]:hidden"
                />
                <img                  src="https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664962/img-5_xjtxus_wlisdl.png"
                  alt="testimonials-5"
                  className="testimonials-img-5 z-[-1] h-[70px] w-[70px] absolute top-[0] right-[20px] rounded-[20px] blur-[3px] max-[991px]:hidden"
                />
                <img                  src="https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664962/img-6_feznf0_dmmu7z.png"
                  alt="testimonials-6"
                  className="testimonials-img-6 z-[-1] h-[60px] w-[60px] absolute bottom-[30px] right-[100px] rounded-[20px] rotate-[-25deg] max-[1399px]:h-[50px] max-[1399px]:w-[50px] max-[1399px]:right-[50px] max-[1199px]:right-[0] max-[991px]:hidden"
                />
                <div className="inner-banner rotate-[270deg] absolute top-[0] z-[-1] left-[150px] bottom-[0] max-[1399px]:left-[110px] max-[1199px]:left-[30px] max-[991px]:hidden">
                  <h4 className="font-quicksand text-[#fff] tracking-[0.03rem] opacity-[0.15] text-[42px] font-bold leading-[1.2] max-[1399px]:text-[38px] max-[1199px]:text-[34px]">
                    Testimonials
                  </h4>
                </div>
                <div className="owl-carousel testimonials-slider">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop
                    speed={500}
                    className="testimonials-swiper"
                  >
                    {
                      loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                          <SwiperSlide key={index}>
                            <div className="bb-testimonials-inner max-w-[900px] m-[auto] max-[1399px]:max-w-[800px]">
                              <div className="flex flex-wrap mx-[-12px] testimonials-row">
                                <div className="min-[768px]:w-[33.33%] w-full px-[12px] max-[767px]:hidden">
                                  <div className="testimonials-image relative max-[575px]:mb-[20px] max-[575px]:max-w-[200px]">
                                    <div className="w-full rounded-[30px] block bg-gray-300 animate-pulse h-[300px]"></div>
                                  </div>
                                </div>
                                <div className="min-[768px]:w-[66.66%] w-full px-[12px]">
                                  <div className="testimonials-contact h-full flex flex-col justify-end">
                                    <div className="user max-[767px]:flex max-[767px]:items-center">
                                      <div className="hidden w-[60px] h-[60px] rounded-[15px] bg-gray-300 animate-pulse max-[767px]:mr-[15px] max-[767px]:block"></div>
                                      <div className="detail">
                                        <div className="bg-gray-300 animate-pulse h-[20px] w-[150px] mb-[8px] rounded-md max-[767px]:mb-[4px]"></div>
                                        <div className="bg-gray-300 animate-pulse h-[14px] w-[100px] rounded-md"></div>
                                      </div>
                                    </div>
                                    <div className="inner-contact bg-[#fff] mt-[10px] border-[1px] border-solid border-[#eee] p-[20px] rounded-[30px]">
                                      <div className="bg-gray-300 animate-pulse h-[100px] w-full rounded-md"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))
                      ) : (
                        testimonialData.map((data, index) => (
                          <SwiperSlide key={index}>
                            <div className="bb-testimonials-inner max-w-[900px] m-[auto] max-[1399px]:max-w-[800px]">
                              <div className="flex flex-wrap mx-[-12px] testimonials-row">
                                <div className="min-[768px]:w-[33.33%] w-full px-[12px] max-[767px]:hidden">
                                  <div className="testimonials-image relative max-[575px]:mb-[20px] max-[575px]:max-w-[200px]">
                                    <Image
                                      src={data?.image?.url}
                                      alt={data?.name}
                                      width={250}
                                      height={250}
                                      className="w-full rounded-[30px] block"
                                    />
                                  </div>
                                </div>
                                <div className="min-[768px]:w-[66.66%] w-full px-[12px]">
                                  <div className="testimonials-contact h-full flex flex-col justify-end">
                                    <div className="user max-[767px]:flex max-[767px]:items-center">
                                      <Image
                                        src={data?.image?.url}
                                        alt={data?.name}
                                        width={250}
                                        height={250}
                                        className="w-full hidden rounded-[15px] max-[767px]:max-w-[60px] max-[767px]:mr-[15px] max-[767px]:flex"
                                      />
                                      <div className="detail">
                                        <h4 className="font-quicksand text-[#3d4750] tracking-[0.03rem] leading-[1.2] mb-[8px] text-[20px] font-bold max-[767px]:mb-[4px] max-[767px]:text-[18px]">
                                          {data?.name}
                                        </h4>
                                        <span className="font-Poppins font-normal tracking-[0.02rem] text-[14px] text-[#777]">
                                          (User)
                                        </span>
                                      </div>
                                    </div>
                                    <div className="inner-contact bg-[#fff] mt-[10px] border-[1px] border-solid border-[#eee] p-[20px] rounded-[30px]">
                                      <p className="font-Poppins text-[#686e7d] text-[14px] leading-[25px] tracking-[0.03rem] font-light">
                                        &quot;{data?.feedback}&quot;
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))
                      )
                    }
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Testimonials;
