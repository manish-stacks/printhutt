import { productService } from "@/_services/common/productService";
import React, { useEffect, useState } from "react";
import ProductCardThree from "./products/ProductCardThree";

const NewProductArea = () => {

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string>('all')
  const fetchData = async (type: string) => {
    try {
      const products = await productService.getNewArrivals(8, type)
      setProductData(products?.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData('all');
  }, []);

  //console.log(productData)

  const getNewArrivals = (type: string) => {
    setActiveMenu(type)
    fetchData(type)
  }

  // // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      {/* New Product tab Area */}
      <section className="section-product-tabs overflow-hidden py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div
                className="section-title mb-[20px] pb-[20px] z-[5] relative flex justify-between max-[991px]:pb-[0] max-[991px]:flex-col max-[991px]:justify-center max-[991px]:text-center"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    New <span className="text-[#6c7fd8]">Arrivals</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Shop online for new arrivals and get free shipping!
                  </p>
                </div>
                <div className="bb-pro-tab">
                  <ul
                    className="bb-pro-tab-nav flex flex-wrap mx-[-20px] max-[991px]:justify-center"
                    id="ProductTab"
                  >
                    <li className={`nav-item relative leading-[28px] cursor-pointer ${activeMenu == 'all' ? 'active' : ''}`}>
                      <a
                        className="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                        onClick={() => getNewArrivals('all')}
                      >
                        All
                      </a>
                    </li>
                    <li className={`nav-item relative leading-[28px] cursor-pointer ${activeMenu == 'customize' ? 'active' : ''}`}>
                      <a
                        className="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                        onClick={() => getNewArrivals('customize')}
                      >
                        Customize &amp; Personalised
                      </a>
                    </li>
                    <li className={`nav-item relative leading-[28px] cursor-pointer ${activeMenu == 'pre' ? 'active' : ''}`}>
                      <a
                        className="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                        onClick={() => getNewArrivals('pre')}
                      >
                        Pre Product
                      </a>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="w-full">
              <div className="tab-content">
                <div className="tab-product-pane" id="all">
                  <div className="flex flex-wrap w-full">

                    {
                      loading ? (
                        Array.from({ length: 8 }, (_, index) => (
                          <div
                            key={index}
                            className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                            data-aos="fade-up"
                            data-aos-duration={1000}
                            data-aos-delay={200}
                          >
                            <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                              {/* Skeleton for Image */}
                              <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                                <div className="skeleton w-full h-[300px] bg-gray-200 rounded-t-[20px]" />
                              </div>

                              {/* Skeleton for Product Content */}
                              <div className="bb-pro-contact p-[20px]">
                                {/* Skeleton for Subtitle */}
                                <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                                  <div className="skeleton w-[50%] h-[16px] bg-gray-200" />
                                  <div className="skeleton w-[30%] h-[16px] bg-gray-200" />
                                </div>

                                {/* Skeleton for Title */}
                                <div className="bb-pro-title mb-[8px]">
                                  <div className="skeleton w-[80%] h-[18px] bg-gray-200" />
                                </div>

                                {/* Skeleton for Price */}
                                <div className="bb-price flex flex-wrap justify-between">
                                  <div className="skeleton w-[40%] h-[18px] bg-gray-200" />
                                  <div className="skeleton w-[20%] h-[18px] bg-gray-200" />
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
                            <ProductCardThree product={product} />
                          </div>
                        ))
                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewProductArea;
