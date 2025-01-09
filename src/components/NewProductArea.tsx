import React from "react";

const NewProductArea = () => {
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
                    <li className="nav-item relative leading-[28px] active">
                      <a
                        className="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                        href="#all"
                      >
                        All
                      </a>
                    </li>
                    <li className="nav-item relative leading-[28px] ">
                      <a
                        className="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                        href="#snack"
                      >
                        Customize &amp; Personalised
                      </a>
                    </li>
                    <li className="nav-item relative leading-[28px]">
                      <a
                        className="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                        href="#fruit"
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
                    <div
                      className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={200}
                    >
                      <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                        <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                          <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                            <span className="text-[14px] text-[#777] font-medium uppercase">
                              New
                            </span>
                          </span>
                          <a >
                            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                              <img
                                className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-1"
                              />
                              <img
                                className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-1"
                              />
                            </div>
                          </a>
                          <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Wishlist"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Quick View"
                                className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                href="compare.html"
                                title="Compare"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Add To Cart"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bb-pro-contact p-[20px]">
                          <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                            >
                              Snacks
                            </a>
                            <span className="bb-pro-rating">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                            </span>
                          </div>
                          <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                            <a
                              href="product-left-sidebar.html"
                              className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                            >
                              Ground Nuts Oil Pack
                            </a>
                          </h4>
                          <div className="bb-price flex flex-wrap justify-between">
                            <div className="inner-price mx-[-3px]">
                              <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                ₹15
                              </span>
                              <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                                ₹22
                              </span>
                            </div>
                            <span className="last-items text-[14px] text-[#686e7d]">
                              500g
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={600}
                    >
                      <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                        <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                          <a >
                            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                              <img
                                className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-3"
                              />
                              <img
                                className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-3"
                              />
                            </div>
                          </a>
                          <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Wishlist"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Quick View"
                                className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                href="compare.html"
                                title="Compare"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Add To Cart"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bb-pro-contact p-[20px]">
                          <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                            >
                              Fruit
                            </a>
                            <span className="bb-pro-rating">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                            </span>
                          </div>
                          <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                            <a
                              href="product-left-sidebar.html"
                              className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                            >
                              Red Cherry Serbia
                            </a>
                          </h4>
                          <div className="bb-price flex flex-wrap justify-between">
                            <div className="inner-price mx-[-3px]">
                              <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                ₹6
                              </span>
                              <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                                ₹8
                              </span>
                            </div>
                            <span className="last-items text-[14px] text-[#686e7d]">
                              250g
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={800}
                    >
                      <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                        <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                          <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                            <span className="text-[14px] text-[#777] font-medium uppercase">
                              Trend
                            </span>
                          </span>
                          <a >
                            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                              <img
                                className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-4"
                              />
                              <img
                                className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-4"
                              />
                            </div>
                          </a>
                          <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Wishlist"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Quick View"
                                className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                href="compare.html"
                                title="Compare"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Add To Cart"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bb-pro-contact p-[20px]">
                          <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                            >
                              Leaves
                            </a>
                            <span className="bb-pro-rating">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                            </span>
                          </div>
                          <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                            <a
                              href="product-left-sidebar.html"
                              className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                            >
                              Fresh Coriander
                            </a>
                          </h4>
                          <div className="bb-price flex flex-wrap justify-between">
                            <div className="inner-price mx-[-3px]">
                              <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                ₹1
                              </span>
                              <span className="item-left px-[3px] text-[14px] text-[#6c7fd8]">
                                Out Of Stock
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={800}
                    >
                      <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                        <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                          <a >
                            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                              <img
                                className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-4"
                              />
                              <img
                                className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-4"
                              />
                            </div>
                          </a>
                          <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Wishlist"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Quick View"
                                className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                href="compare.html"
                                title="Compare"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Add To Cart"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bb-pro-contact p-[20px]">
                          <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                            >
                              Chips
                            </a>
                            <span className="bb-pro-rating">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                            </span>
                          </div>
                          <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                            <a
                              href="product-left-sidebar.html"
                              className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                            >
                              Crunchy Potato Chips
                            </a>
                          </h4>
                          <div className="bb-price flex flex-wrap justify-between">
                            <div className="inner-price mx-[-3px]">
                              <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                ₹25
                              </span>
                              <span className="item-left px-[3px] text-[14px] text-[#6c7fd8]">
                                Out Of Stock
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={200}
                    >
                      <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                        <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                          <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                            <span className="text-[14px] text-[#777] font-medium uppercase">
                              Sale
                            </span>
                          </span>
                          <a >
                            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                              <img
                                className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-5"
                              />
                              <img
                                className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-5"
                              />
                            </div>
                          </a>
                          <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Wishlist"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Quick View"
                                className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                href="compare.html"
                                title="Compare"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Add To Cart"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bb-pro-contact p-[20px]">
                          <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                            >
                              Spices
                            </a>
                            <span className="bb-pro-rating">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                            </span>
                          </div>
                          <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                            <a
                              href="product-left-sidebar.html"
                              className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                            >
                              Black Pepper Spice pack
                            </a>
                          </h4>
                          <div className="bb-price flex flex-wrap justify-between">
                            <div className="inner-price mx-[-3px]">
                              <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                ₹32
                              </span>
                              <span className="item-left px-[3px] text-[14px] text-[#6c7fd8]">
                                2 Left
                              </span>
                            </div>
                            <span className="last-items text-[14px] text-[#686e7d]">
                              1 pack
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={400}
                    >
                      <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                        <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                          <a >
                            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                              <img
                                className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-6"
                              />
                              <img
                                className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-6"
                              />
                            </div>
                          </a>
                          <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Wishlist"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Quick View"
                                className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                href="compare.html"
                                title="Compare"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Add To Cart"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bb-pro-contact p-[20px]">
                          <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                            >
                              Fruit
                            </a>
                            <span className="bb-pro-rating">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                            </span>
                          </div>
                          <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                            <a
                              href="product-left-sidebar.html"
                              className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                            >
                              Red Guava
                            </a>
                          </h4>
                          <div className="bb-price flex flex-wrap justify-between">
                            <div className="inner-price mx-[-3px]">
                              <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                ₹15
                              </span>
                              <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                                ₹17
                              </span>
                            </div>
                            <span className="last-items text-[14px] text-[#686e7d]">
                              2kg
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={600}
                    >
                      <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                        <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                          <a >
                            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                              <img
                                className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-7"
                              />
                              <img
                                className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-7"
                              />
                            </div>
                          </a>
                          <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Wishlist"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Quick View"
                                className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                href="compare.html"
                                title="Compare"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Add To Cart"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bb-pro-contact p-[20px]">
                          <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                            >
                              Spices
                            </a>
                            <span className="bb-pro-rating">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                            </span>
                          </div>
                          <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                            <a
                              href="product-left-sidebar.html"
                              className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                            >
                              Chilli Flakes Pack
                            </a>
                          </h4>
                          <div className="bb-price flex flex-wrap justify-between">
                            <div className="inner-price mx-[-3px]">
                              <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                ₹29
                              </span>
                              <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                                ₹31
                              </span>
                            </div>
                            <span className="last-items text-[14px] text-[#686e7d]">
                              250g
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="min-[1200px]:w-[25%] min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={600}
                    >
                      <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                        <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                          <a >
                            <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                              <img
                                className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-3"
                              />
                              <img
                                className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                                src="https://printhutt.com/media/product_images/847907234_led-lemppng.png"
                                alt="product-3"
                              />
                            </div>
                          </a>
                          <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Wishlist"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Quick View"
                                className="bb-modal-toggle w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-eye-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                href="compare.html"
                                title="Compare"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-repeat-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                            <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                              <a
                                
                                title="Add To Cart"
                                className="w-[35px] h-[35px] flex items-center justify-center"
                              >
                                <i className="ri-shopping-bag-4-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bb-pro-contact p-[20px]">
                          <div className="bb-pro-subtitle mb-[8px] flex flex-wrap justify-between">
                            <a
                              href="shop-left-sidebar-col-3.html"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] leading-[16px] text-[#777] font-light tracking-[0.03rem]"
                            >
                              Vegetable
                            </a>
                            <span className="bb-pro-rating">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                            </span>
                          </div>
                          <h4 className="bb-pro-title mb-[8px] text-[16px] leading-[18px]">
                            <a
                              href="product-left-sidebar.html"
                              className="transition-all duration-[0.3s] ease-in-out font-quicksand w-full block whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[18px] text-[#3d4750] font-semibold tracking-[0.03rem]"
                            >
                              Red organic Onion
                            </a>
                          </h4>
                          <div className="bb-price flex flex-wrap justify-between">
                            <div className="inner-price mx-[-3px]">
                              <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                                ₹10
                              </span>
                              <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                                ₹15
                              </span>
                            </div>
                            <span className="last-items text-[14px] text-[#686e7d]">
                              5kg
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
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
