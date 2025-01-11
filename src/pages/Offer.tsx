"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductSlider from "@/components/ProductSlider";
import { productService } from "@/_services/common/productService";
import ProductCard from "@/components/products/ProductCard";

const Offer = () => {


  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const products = await productService.getOfferProduct(8)
      setProductData(products?.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  // console.log(productData)
  return (
    <>
      {/* Offer */}
      <Breadcrumb title={"Offers"} />

      <section className="section-offer py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div
                className="section-title mb-[20px] pb-[20px] relative flex flex-col items-center text-center max-[991px]:pb-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    Best<span className="text-[#6c7fd8]"> Offer</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    check latest offers for you.
                  </p>
                </div>
              </div>
            </div>


            {
              loading ? (

                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      {/* Skeleton for Product Image */}
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <div className="skeleton w-full h-[300px] bg-gray-200 rounded-t-[20px]" />
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          {Array.from({ length: 4 }).map((_, actionIndex) => (
                            <li
                              key={actionIndex}
                              className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center bg-gray-200 rounded-[10px]"
                            />
                          ))}
                        </ul>
                      </div>

                      {/* Skeleton for Timer */}
                      <div className="timer1 dealend-timer py-[10px] px-[15px] flex justify-between">
                        {Array.from({ length: 4 }).map((_, timerIndex) => (
                          <div key={timerIndex} className="time-block text-center">
                            <div className="skeleton w-[30px] h-[20px] bg-gray-200 mx-auto" />
                            <span className="text-[12px] text-[#777]">--</span>
                          </div>
                        ))}
                      </div>

                      {/* Skeleton for Content */}
                      <div className="bb-pro-contact p-[20px]">
                        <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                          <div className="skeleton w-[30%] h-[12px] bg-gray-200" />
                          <div className="flex gap-[3px]">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <div
                                key={starIndex}
                                className={`skeleton w-[15px] h-[15px] rounded-full ${starIndex < 4 ? 'bg-[#fea99a]' : 'bg-gray-200'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="skeleton w-[80%] h-[16px] bg-gray-200 mb-[8px]" />
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price flex gap-[3px]">
                            <div className="skeleton w-[40px] h-[16px] bg-gray-200" />
                            <div className="skeleton w-[30px] h-[14px] bg-gray-200" />
                          </div>
                          <div className="skeleton w-[40px] h-[14px] bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))

              ) : (

                productData.map((product, index) => (
                  <div
                    key={index}
                    className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={200}
                  >
                    <ProductCard product={product} />
                  </div>
                ))

              )
            }



          </div >
        </div >
      </section >
      {/* Day of the deal */}
      <section className="section-deal overflow-hidden py-[50px] max-[1199px]:py-[35px]" >
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
                    Valentine Day  Deals{" "}
                    <span className="text-[#6c7fd8]">50% Off</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Don&apos;t wait. The time will never be just right.
                  </p>
                </div>
                <div id="dealend" className="dealend-timer" />
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div className="bb-deal-slider m-[-12px]">
                <div className="bb-deal-block owl-carousel">
                  <ProductSlider products={productData} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Offer;
