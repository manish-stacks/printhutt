"use client";
import React from "react";
import ProductSlider from "@/components/ProductSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumb from "@/components/Breadcrumb";

const Cart = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Cart"} />

      {/* Cart */}
      <section className="section-cart py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="min-[992px]:w-[33.33%] w-full px-[12px] mb-[24px]">
              <div
                className="bb-cart-sidebar-block p-[20px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="bb-sb-title mb-[20px]">
                  <h3 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                    Summary
                  </h3>
                </div>
                <div className="bb-sb-blok-contact">
                  <form action="#" method="post">
                    <div className="input-box mb-[30px]">
                      <label className="mb-[12px] inline-block text-[14px] font-medium text-[#3d4750] leading-[26px]">
                        Country *
                      </label>
                      <div className="custom-select py-[10px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] bg-[#fff] leading-[26px]">
                        <select>
                          <option value="option1">Country 1</option>
                          <option value="option2">Country 2</option>
                          <option value="option3">Country 3</option>
                          <option value="option4">Country 4</option>
                          <option value="option5">Country 5</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-box mb-[30px]">
                      <label className="mb-[12px] inline-block text-[14px] font-medium text-[#3d4750] leading-[26px]">
                        State/Province *
                      </label>
                      <div className="custom-select py-[10px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] bg-[#fff] leading-[26px]">
                        <select>
                          <option value="option1">
                            Please Select a region, state
                          </option>
                          <option value="option2">Region/State 1</option>
                          <option value="option3">Region/State 2</option>
                          <option value="option4">Region/State 3</option>
                          <option value="option5">Region/State 4</option>
                          <option value="option6">Region/State 5</option>
                          <option value="option7">Region/State 6</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-box mb-[30px]">
                      <label
                        htmlFor="Zip-code"
                        className="mb-[12px] inline-block text-[14px] font-medium text-[#3d4750] leading-[26px]"
                      >
                        Zip/Postal Code *
                      </label>
                      <input
                        type="text"
                        placeholder="Zip/Postal Code"
                        className="w-full py-[10px] px-[15px]  leading-[26px] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px] text-[14px] font-normal text-[#686e7d] bg-[#fff]"
                        id="Zip-code"
                      />
                    </div>
                  </form>
                  <div className="bb-cart-summary">
                    <div className="inner-summary">
                      <ul>
                        <li className="mb-[12px] flex justify-between leading-[28px]">
                          <span className="text-left font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-medium">
                            Sub-Total
                          </span>
                          <span className="text-right font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-semibold">
                            $80.00
                          </span>
                        </li>
                        <li className="mb-[12px] flex justify-between leading-[28px]">
                          <span className="text-left font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-medium">
                            Delivery Charges
                          </span>
                          <span className="text-right font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-semibold">
                            $80.00
                          </span>
                        </li>
                        <li className="mb-[12px] flex justify-between leading-[28px]">
                          <span className="text-left font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-medium">
                            Coupon Discount
                          </span>
                          <span className="text-right font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-semibold">
                            <a className="bb-coupon drop-coupon font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#ff0000] cursor-pointer">
                              Apply Coupon
                            </a>
                          </span>
                        </li>
                        <li className="mb-[12px] flex justify-between leading-[28px]">
                          <div className="coupon-down-box w-full">
                            <form method="post" className="relative mb-[15px]">
                              <input
                                className="bb-coupon w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                                type="text"
                                placeholder="Enter Your coupon Code"
                                name="bb-coupon"
                                
                              />
                              <button
                                className="bb-btn-2 transition-all duration-[0.3s] ease-in-out my-[8px] mr-[8px] flex justify-center items-center absolute right-[0] top-[0] bottom-[0] font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[12px] text-[13px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                type="submit"
                              >
                                Apply
                              </button>
                            </form>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="summary-total border-t-[1px] border-solid border-[#eee] pt-[15px]">
                      <ul className="mb-[0]">
                        <li className="mb-[6px] flex justify-between">
                          <span className="text-left font-Poppins text-[16px] leading-[28px] tracking-[0.03rem] font-semibold text-[#686e7d]">
                            Total Amount
                          </span>
                          <span className="text-right font-Poppins text-[16px] leading-[28px] tracking-[0.03rem] font-semibold text-[#686e7d]">
                            $80.00
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
              <div
                className="bb-cart-table border-[1px] border-solid border-[#eee] rounded-[20px] overflow-hidden max-[1399px]:overflow-y-auto"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={400}
              >
                <table className="w-full max-[1399px]:w-[780px]">
                  <thead>
                    <tr className="border-b-[1px] border-solid border-[#eee]">
                      <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize">
                        Product
                      </th>
                      <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize">
                        Price
                      </th>
                      <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize">
                        quality
                      </th>
                      <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize">
                        Total
                      </th>
                      <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b-[1px] border-solid border-[#eee]">
                      <td className="p-[12px]">
                        <a href="javascript:void(0)">
                          <div className="Product-cart flex items-center">
                            <img
                              src="https://printhutt.com//media/table-name-lemp.png"
                              alt="new-product-1"
                              className="w-[70px] border-[1px] border-solid border-[#eee] rounded-[10px]"
                            />
                            <span className="ml-[10px] font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                              Ground Nuts Oil Pack
                            </span>
                          </div>
                        </a>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $15
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="qty-plus-minus w-[85px] h-[45px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]">
                          <div className="dec bb-qtybtn">-</div>
                          <input
                            className="qty-input text-[#777] float-left text-[14px] h-[auto] m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                            type="text"
                            name="bb-qtybtn"
                            defaultValue={1}
                          />
                          <div className="inc bb-qtybtn">+</div>
                        </div>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $15
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="pro-remove">
                          <a href="javascript:void(0)">
                            <i className="ri-delete-bin-line transition-all duration-[0.3s] ease-in-out text-[20px] text-[#686e7d] hover:text-[#ff0000]" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b-[1px] border-solid border-[#eee]">
                      <td className="p-[12px]">
                        <a href="javascript:void(0)">
                          <div className="Product-cart flex items-center">
                            <img
                              src="https://printhutt.com//media/table-name-lemp.png"
                              alt="new-product-2"
                              className="w-[70px] border-[1px] border-solid border-[#eee] rounded-[10px]"
                            />
                            <span className="ml-[10px] font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                              Organic Litchi Juice Pack
                            </span>
                          </div>
                        </a>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $25
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="qty-plus-minus w-[85px] h-[45px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]">
                          <input
                            className="qty-input text-[#777] float-left text-[14px] h-[auto] m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                            type="text"
                            name="bb-qtybtn"
                            defaultValue={1}
                          />
                        </div>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $25
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="pro-remove">
                          <a href="javascript:void(0)">
                            <i className="ri-delete-bin-line transition-all duration-[0.3s] ease-in-out text-[20px] text-[#686e7d] hover:text-[#ff0000]" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b-[1px] border-solid border-[#eee]">
                      <td className="p-[12px]">
                        <a href="javascript:void(0)">
                          <div className="Product-cart flex items-center">
                            <img
                              src="https://printhutt.com//media/table-name-lemp.png"
                              alt="new-product-3"
                              className="w-[70px] border-[1px] border-solid border-[#eee] rounded-[10px]"
                            />
                            <span className="ml-[10px] font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                              Crunchy Banana Chips
                            </span>
                          </div>
                        </a>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $12
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="qty-plus-minus w-[85px] h-[45px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]">
                          <input
                            className="qty-input text-[#777] float-left text-[14px] h-[auto] m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                            type="text"
                            name="bb-qtybtn"
                            defaultValue={1}
                          />
                        </div>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $12
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="pro-remove">
                          <a href="javascript:void(0)">
                            <i className="ri-delete-bin-line transition-all duration-[0.3s] ease-in-out text-[20px] text-[#686e7d] hover:text-[#ff0000]" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b-[1px] border-solid border-[#eee]">
                      <td className="p-[12px]">
                        <a href="javascript:void(0)">
                          <div className="Product-cart flex items-center">
                            <img
                              src="https://printhutt.com//media/table-name-lemp.png"
                              alt="new-product-4"
                              className="w-[70px] border-[1px] border-solid border-[#eee] rounded-[10px]"
                            />
                            <span className="ml-[10px] font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                              Crunchy Potato Chips
                            </span>
                          </div>
                        </a>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $25
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="qty-plus-minus w-[85px] h-[45px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]">
                          <input
                            className="qty-input text-[#777] float-left text-[14px] h-[auto] m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                            type="text"
                            name="bb-qtybtn"
                            defaultValue={1}
                          />
                        </div>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $25
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="pro-remove">
                          <a href="javascript:void(0)">
                            <i className="ri-delete-bin-line transition-all duration-[0.3s] ease-in-out text-[20px] text-[#686e7d] hover:text-[#ff0000]" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-[12px]">
                        <a href="javascript:void(0)">
                          <div className="Product-cart flex items-center">
                            <img
                              src="https://printhutt.com//media/table-name-lemp.png"
                              alt="new-product-5"
                              className="w-[70px] border-[1px] border-solid border-[#eee] rounded-[10px]"
                            />
                            <span className="ml-[10px] font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                              Black Pepper Spice pack
                            </span>
                          </div>
                        </a>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $32
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="qty-plus-minus w-[85px] h-[45px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]">
                          <input
                            className="qty-input text-[#777] float-left text-[14px] h-[auto] m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                            type="text"
                            name="bb-qtybtn"
                            defaultValue={1}
                          />
                        </div>
                      </td>
                      <td className="p-[12px]">
                        <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                          $32
                        </span>
                      </td>
                      <td className="p-[12px]">
                        <div className="pro-remove">
                          <a href="javascript:void(0)">
                            <i className="ri-delete-bin-line transition-all duration-[0.3s] ease-in-out text-[20px] text-[#686e7d] hover:text-[#ff0000]" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <a
                href="checkout.html"
                className="bb-btn-2 mt-[24px] inline-flex items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[8px] px-[20px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={400}
              >
                Check Out
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Related product */}
      <section className="section-related-product py-[50px] max-[1199px]:py-[35px]">
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
                    New <span className="text-[#6c7fd8]">Arrivals</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Browse The Collection of Top Products.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div className="bb-deal-slider m-[-12px]">
                <div className="bb-deal-block owl-carousel">
                  <ProductSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
