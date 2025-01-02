import React from "react";
import Slider from "react-slick";

const InstagramHome = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
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
      <section className="section-instagram overflow-hidden py-[50px] max-[1199px]:py-[35px] relative">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div className="bb-title m-[auto] py-[15px] px-[30px] bg-[#fff] rounded-[30px] absolute top-[50%] left-[50%] z-[5] max-[991px]:py-[8px] max-[991px]:px-[20px]">
                <h3 className="font-quicksand m-[0] text-[#3d4750] font-semibold tracking-[0.03rem] leading-[1.2] text-[28px] max-[991px]:text-[25px]">
                  #Insta
                </h3>
              </div>
              <div className="bb-instagram-slider">
                <Slider {...settings}>
                  <div className="px-2">
                    <div
                      className="bb-instagram-card"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={200}
                    >
                      <div className="instagram-img relative overflow-hidden rounded-[30px]">
                        <a >
                          <img
                            src="https://printhutt.com//media/table-name-lemp.png"
                            alt="instagram-1"
                            className="w-full rounded-[20px]"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="bb-instagram-card"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={300}
                    >
                      <div className="instagram-img relative overflow-hidden rounded-[30px]">
                        <a >
                          <img
                            src="https://printhutt.com//media/table-name-lemp.png"
                            alt="instagram-2"
                            className="w-full rounded-[20px]"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="bb-instagram-card"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={400}
                    >
                      <div className="instagram-img relative overflow-hidden rounded-[30px]">
                        <a >
                          <img
                            src="https://printhutt.com//media/table-name-lemp.png"
                            alt="instagram-3"
                            className="w-full rounded-[20px]"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="bb-instagram-card"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={500}
                    >
                      <div className="instagram-img relative overflow-hidden rounded-[30px]">
                        <a >
                          <img
                            src="https://printhutt.com//media/table-name-lemp.png"
                            alt="instagram-4"
                            className="w-full rounded-[20px]"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="bb-instagram-card"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={600}
                    >
                      <div className="instagram-img relative overflow-hidden rounded-[30px]">
                        <a >
                          <img
                            src="https://printhutt.com//media/table-name-lemp.png"
                            alt="instagram-5"
                            className="w-full rounded-[20px]"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="bb-instagram-card"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={700}
                    >
                      <div className="instagram-img relative overflow-hidden rounded-[30px]">
                        <a >
                          <img
                            src="https://printhutt.com//media/table-name-lemp.png"
                            alt="instagram-6"
                            className="w-full rounded-[20px]"
                          />
                        </a>
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

export default InstagramHome;
