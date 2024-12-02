import React from "react";
import Slider from "react-slick";

const PersonalisedGifts = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <>
      <section className="section-team py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div
                className="section-title text-center mb-[20px] pb-[20px] z-[5] relative flex justify-center max-[991px]:pb-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    Personalised <span className="text-[#6c7fd8]">Gifts</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Explore the trendiest products at PrintHutt and bring them home to decorate your space!
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div className="bb-team owl-carousel">
                <Slider {...settings}>
                  <div className="px-2">
                    <div
                      className="bb-team-box"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={200}
                    >
                      <div className="bb-team-img mb-[20px] relative h-full flex items-center overflow-hidden">
                        <div className="bb-team-socials transition-all duration-[0.3s] ease-in-out bg-[#fff] rounded-tl-[20px] rounded-bl-[20px] absolute right-[-38px]">
                          <div className="inner-shape relative" />
                          <ul className="mb-[0] py-[20px] px-[10px]">
                            <li className="bb-social-link leading-[28px] pb-[10px]">
                              <a href="javascript:void(0)">
                                <i className="ri-edit-circle-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                            <li className="bb-social-link leading-[28px] pb-[10px]">
                              <a href="javascript:void(0)">
                                <i className="ri-shopping-cart-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                            <li className="bb-social-link leading-[28px]">
                              <a href="javascript:void(0)">
                                <i className="ri-heart-2-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <img
                          src="https://printhutt.com/media/led-lemp.jpg"
                          alt="team-1"
                          className="w-full rounded-[20px]"
                        />
                      </div>
                      <div className="bb-team-contact text-center">
                        <h5 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[18px] font-bold text-[#3d4750]">
                          Elena Wilson
                        </h5>
                        <p className="font-Poppins font-light leading-[28px] tracking-[0.03rem] text-[15px] text-[#686e7d] mt-3">
                          <button type="button" className="w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Lime</button>

                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="bb-team-box"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={400}
                    >
                      <div className="bb-team-img mb-[20px] relative h-full flex items-center overflow-hidden">
                        <div className="bb-team-socials transition-all duration-[0.3s] ease-in-out bg-[#fff] rounded-tl-[20px] rounded-bl-[20px] absolute right-[-38px]">
                          <div className="inner-shape relative" />
                          <ul className="mb-[0] py-[20px] px-[10px]">
                            <li className="bb-social-link leading-[28px] pb-[10px]">
                              <a href="javascript:void(0)">
                                <i className="ri-edit-circle-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                            <li className="bb-social-link leading-[28px] pb-[10px]">
                              <a href="javascript:void(0)">
                                <i className="ri-shopping-cart-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                            <li className="bb-social-link leading-[28px]">
                              <a href="javascript:void(0)">
                                <i className="ri-heart-2-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <img
                          src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                          alt="team-2"
                          className="w-full rounded-[20px]"
                        />
                      </div>
                      <div className="bb-team-contact text-center">
                        <h5 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[18px] font-bold text-[#3d4750]">
                          Mario Bisop
                        </h5>
                        <p className="font-Poppins font-light leading-[28px] tracking-[0.03rem] text-[15px] text-[#686e7d] mt-3">
                          <button type="button" className="w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Red</button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="bb-team-box"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={600}
                    >
                      <div className="bb-team-img mb-[20px] relative h-full flex items-center overflow-hidden">
                        <div className="bb-team-socials transition-all duration-[0.3s] ease-in-out bg-[#fff] rounded-tl-[20px] rounded-bl-[20px] absolute right-[-38px]">
                          <div className="inner-shape relative" />
                          <ul className="mb-[0] py-[20px] px-[10px]">
                            <li className="bb-social-link leading-[28px] pb-[10px]">
                              <a href="javascript:void(0)">
                                <i className="ri-edit-circle-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                            <li className="bb-social-link leading-[28px] pb-[10px]">
                              <a href="javascript:void(0)">
                                <i className="ri-shopping-cart-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                            <li className="bb-social-link leading-[28px]">
                              <a href="javascript:void(0)">
                                <i className="ri-heart-2-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <img
                          src="https://printhutt.com//media/table-name-lemp.png"
                          alt="team-3"
                          className="w-full rounded-[20px]"
                        />
                      </div>
                      <div className="bb-team-contact text-center">
                        <h5 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[18px] font-bold text-[#3d4750]">
                          Maria Margret
                        </h5>
                        <p className="font-Poppins font-light leading-[28px] tracking-[0.03rem] text-[15px] text-[#686e7d] mt-3">
                          <button type="button" className="w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pink</button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div
                      className="bb-team-box"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={800}
                    >
                      <div className="bb-team-img mb-[20px] relative h-full flex items-center overflow-hidden">
                        <div className="bb-team-socials transition-all duration-[0.3s] ease-in-out bg-[#fff] rounded-tl-[20px] rounded-bl-[20px] absolute right-[-38px]">
                          <div className="inner-shape relative" />
                          <ul className="mb-[0] py-[20px] px-[10px]">
                            <li className="bb-social-link leading-[28px] pb-[10px]">
                              <a href="javascript:void(0)">
                                <i className="ri-edit-circle-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                            <li className="bb-social-link leading-[28px] pb-[10px]">
                              <a href="javascript:void(0)">
                                <i className="ri-shopping-cart-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                            <li className="bb-social-link leading-[28px]">
                              <a href="javascript:void(0)">
                                <i className="ri-heart-2-fill text-[16px] hover:text-[#6c7fd8]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <img
                          src="https://printhutt.com/media/Acrylic-Frame.jpg"
                          alt="team-4"
                          className="w-full rounded-[20px]"
                        />
                      </div>
                      <div className="bb-team-contact text-center">
                        <h5 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[18px] font-bold text-[#3d4750]">
                          Juliat Hilson
                        </h5>
                        <p className="font-Poppins font-light leading-[28px] tracking-[0.03rem] text-[15px] text-[#686e7d] mt-3">
                          <button type="button" className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Purple</button>
                        </p>
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

export default PersonalisedGifts;
