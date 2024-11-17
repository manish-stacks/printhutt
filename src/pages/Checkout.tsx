import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const Checkout = () => {
  return (
    <>
      {/* Breadcrumb */}

      <Breadcrumb title={"Checkout"} />

      {/* checkout */}
      <section className="section-checkout py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">

            <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
              <div
                className="bb-checkout-contact border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={400}
              >
                <div className="main-title mb-[20px]">
                  <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                    New Customer
                  </h4>
                </div>
                <label className="inner-title font-Poppins leading-[26px] tracking-[0.02rem] mb-[6px] text-[16px] inline-block font-medium text-[#3d4750]">
                  Checkout Options
                </label>
                <div className="checkout-radio flex mb-[10px] max-[480px]:flex-col">
                  <div className="radio-itens mr-[20px]">
                    <input
                      type="radio"
                      id="del1"
                      name="account"
                      className="w-auto mr-[2px] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"

                    />
                    <label
                      htmlFor="del1"
                      className="text-[14px] font-normal text-[#686e7d] relative pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                    >
                      Register Account
                    </label>
                  </div>
                  <div className="radio-itens">
                    <input
                      type="radio"
                      id="del2"
                      name="account"
                      className="w-auto mr-[2px] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                    />
                    <label
                      htmlFor="del2"
                      className="text-[14px] font-normal text-[#686e7d] relative pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                    >
                      Guest Account
                    </label>
                  </div>
                </div>
                <p className="font-Poppins leading-[28px] tracking-[0.03rem] mb-[16px] text-[14px] font-light text-[#686e7d]">
                  By creating an account you will be able to shop faster, be up
                  to date on an order's status, and keep track of the orders you
                  have previously made.
                </p>
                <div className="inner-button mb-[20px]">
                  <a
                    href="javascript:void(0)"
                    className="bb-btn-2 inline-block items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                  >
                    Continue
                  </a>
                </div>
                <div className="main-title mb-[20px]">
                  <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                    Returning Customer
                  </h4>
                </div>
                <form method="post">
                  <div className="input-item mb-[24px]">
                    <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your email address"
                      className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] leading-[26px] rounded-[10px]"

                    />
                  </div>
                  <div className="input-item mb-[24px]">
                    <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] leading-[26px] rounded-[10px]"

                    />
                  </div>
                  <div className="input-button mb-[20px]">
                    <button
                      type="button"
                      className="bb-btn-2 inline-block items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="main-title mb-[20px]">
                  <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                    Billing Details
                  </h4>
                </div>
                <div className="checkout-radio flex mb-[10px] max-[480px]:flex-col">
                  <div className="radio-itens mr-[20px]">
                    <input
                      type="radio"
                      id="address1"
                      name="address"
                      className="w-auto mr-[2px] p-[10px]"

                    />
                    <label
                      htmlFor="address1"
                      className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                    >
                      I want to use an existing address
                    </label>
                  </div>
                  <div className="radio-itens">
                    <input
                      type="radio"
                      id="address2"
                      name="address"
                      className="w-auto mr-[2px] p-[10px]"
                    />
                    <label
                      htmlFor="address2"
                      className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                    >
                      I want to use new address
                    </label>
                  </div>
                </div>
                <div className="input-box-form mt-[20px]">
                  <form method="post">
                    <div className="flex flex-wrap mx-[-12px]">
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="input-item mb-[24px]">
                          <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your First Name"
                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                          />
                        </div>
                      </div>
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="input-item mb-[24px]">
                          <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your Last Name"
                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                          />
                        </div>
                      </div>
                      <div className="w-full px-[12px]">
                        <div className="input-item mb-[24px]">
                          <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                            Address *
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Address Line 1"
                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                          />
                        </div>
                      </div>
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="input-item mb-[24px]">
                          <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                            City *
                          </label>
                          <div className="custom-select p-[10px] border-[1px] border-solid border-[#eee] leading-[26px] rounded-[10px]">
                            <select>
                              <option value="option1">City</option>
                              <option value="option1">City 1</option>
                              <option value="option2">City 2</option>
                              <option value="option3">City 3</option>
                              <option value="option4">City 4</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="input-item mb-[24px]">
                          <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                            Post Code *
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Post Code"
                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                          />
                        </div>
                      </div>
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="input-item mb-[24px]">
                          <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                            Country *
                          </label>
                          <div className="custom-select p-[10px] border-[1px] border-solid border-[#eee] leading-[26px] rounded-[10px]">
                            <select>
                              <option value="option1">Country</option>
                              <option value="option1">Country 1</option>
                              <option value="option2">Country 2</option>
                              <option value="option3">Country 3</option>
                              <option value="option4">Country 4</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="input-item mb-[24px]">
                          <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                            Region State *
                          </label>
                          <div className="custom-select p-[10px] border-[1px] border-solid border-[#eee] leading-[26px] rounded-[10px]">
                            <select>
                              <option value="option1">Region/State</option>
                              <option value="option1">Region/State 1</option>
                              <option value="option2">Region/State 2</option>
                              <option value="option3">Region/State 3</option>
                              <option value="option4">Region/State 4</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="w-full px-[12px]">
                        <div className="input-button">
                          <button
                            type="button"
                            className="bb-btn-2 inline-block items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="min-[992px]:w-[33.33%] w-full px-[12px] mb-[24px]">
              <div className="bb-checkout-sidebar mb-[-24px]">
                <div
                  className="checkout-items border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] mb-[24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={200}
                >
                  <div className="sub-title mb-[12px]">
                    <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                      summary
                    </h4>
                  </div>
                  <div className="checkout-summary mb-[20px] border-b-[1px] border-solid border-[#eee]">
                    <ul className="mb-[20px]">
                      <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          sub-total
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          $56
                        </span>
                      </li>
                      <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          Delivery Charges
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          $56
                        </span>
                      </li>
                      <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          Coupon Discount
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          <a
                            href="javascript:void(0)"
                            className="apply drop-coupon font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#ff0000]"
                          >
                            Apply Coupon
                          </a>
                        </span>
                      </li>
                      <li className="flex justify-between leading-[28px]">
                        <div className="coupon-down-box w-full">
                          <form method="post" className="relative">
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
                  <div className="bb-checkout-pro mb-[-24px]">
                    <div className="pro-items p-[15px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] flex mb-[24px] max-[420px]:flex-col">
                      <div className="image mr-[15px] max-[420px]:mr-[0] max-[420px]:mb-[15px]">
                        <img
                          src="http://localhost/dashboard/printhutt/media/product/995600215_acrelic-frame.jpg"
                          alt="new-product-1"
                          className="max-w-max w-[100px] h-[100px] border-[1px] border-solid border-[#eee] rounded-[20px] max-[1399px]:h-[80px] max-[1399px]:w-[80px]"
                        />
                      </div>
                      <div className="items-contact">
                        <h4 className="text-[16px]">
                          <a
                            href="javascript:void(0)"
                            className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]"
                          >
                            Ground Nuts Oil Pack
                          </a>
                        </h4>
                        <span className="bb-pro-rating flex">
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                        </span>
                        <div className="inner-price flex items-center justify-left mb-[4px]">
                          <span className="new-price font-Poppins text-[#3d4750] font-semibold leading-[26px] tracking-[0.02rem] text-[15px]">
                            $15
                          </span>
                          <span className="old-price ml-[10px] font-Poppins text-[#777] font-semibold leading-[26px] tracking-[0.02rem] text-[15px] line-through">
                            $22
                          </span>
                        </div>
                        <div className="bb-pro-variation">
                          <ul className="flex flex-wrap m-[-2px]">
                            <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal active">
                              <a
                                href="javascript:void(0)"
                                className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                                data-tooltip="Small"
                              >
                                250g
                              </a>
                            </li>
                            <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal">
                              <a
                                href="javascript:void(0)"
                                className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                                data-tooltip="Medium"
                              >
                                500g
                              </a>
                            </li>
                            <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal">
                              <a
                                href="javascript:void(0)"
                                className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                                data-tooltip="Large"
                              >
                                1kg
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-items p-[15px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] flex mb-[24px] max-[420px]:flex-col">
                      <div className="image mr-[15px] max-[420px]:mr-[0] max-[420px]:mb-[15px]">
                        <img
                          src="http://localhost/dashboard/printhutt/media/product/995600215_acrelic-frame.jpg"
                          alt="new-product-2"
                          className="max-w-max w-[100px] h-[100px] border-[1px] border-solid border-[#eee] rounded-[20px] max-[1399px]:h-[80px] max-[1399px]:w-[80px]"
                        />
                      </div>
                      <div className="items-contact">
                        <h4 className="text-[16px]">
                          <a
                            href="javascript:void(0)"
                            className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]"
                          >
                            Organic Litchi Juice Pack
                          </a>
                        </h4>
                        <span className="bb-pro-rating flex">
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                        </span>
                        <div className="inner-price flex items-center justify-left mb-[4px]">
                          <span className="new-price font-Poppins text-[#3d4750] font-semibold leading-[26px] tracking-[0.02rem] text-[15px]">
                            $25
                          </span>
                          <span className="old-price ml-[10px] font-Poppins text-[#777] font-semibold leading-[26px] tracking-[0.02rem] text-[15px] line-through">
                            $30
                          </span>
                        </div>
                        <div className="bb-pro-variation">
                          <ul className="flex flex-wrap m-[-2px]">
                            <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal active">
                              <a
                                href="javascript:void(0)"
                                className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                                data-tooltip="Small"
                              >
                                250g
                              </a>
                            </li>
                            <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal">
                              <a
                                href="javascript:void(0)"
                                className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                                data-tooltip="Medium"
                              >
                                500g
                              </a>
                            </li>
                            <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal">
                              <a
                                href="javascript:void(0)"
                                className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                                data-tooltip="Large"
                              >
                                1kg
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-items p-[15px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] flex mb-[24px] max-[420px]:flex-col">
                      <div className="image mr-[15px] max-[420px]:mr-[0] max-[420px]:mb-[15px]">
                        <img
                          src="http://localhost/dashboard/printhutt/media/product/995600215_acrelic-frame.jpg"
                          alt="new-product-3"
                          className="max-w-max w-[100px] h-[100px] border-[1px] border-solid border-[#eee] rounded-[20px] max-[1399px]:h-[80px] max-[1399px]:w-[80px]"
                        />
                      </div>
                      <div className="items-contact">
                        <h4 className="text-[16px]">
                          <a
                            href="javascript:void(0)"
                            className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]"
                          >
                            Crunchy Banana Chips
                          </a>
                        </h4>
                        <span className="bb-pro-rating flex">
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                        </span>
                        <div className="inner-price flex items-center justify-left mb-[4px]">
                          <span className="new-price font-Poppins text-[#3d4750] font-semibold leading-[26px] tracking-[0.02rem] text-[15px]">
                            $01
                          </span>
                          <span className="old-price ml-[10px] font-Poppins text-[#777] font-semibold leading-[26px] tracking-[0.02rem] text-[15px] line-through">
                            $02
                          </span>
                        </div>
                        <div className="bb-pro-variation">
                          <ul className="flex flex-wrap m-[-2px]">
                            <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal active">
                              <a
                                href="javascript:void(0)"
                                className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                                data-tooltip="Small"
                              >
                                250g
                              </a>
                            </li>
                            <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal">
                              <a
                                href="javascript:void(0)"
                                className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                                data-tooltip="Medium"
                              >
                                500g
                              </a>
                            </li>
                            <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal">
                              <a
                                href="javascript:void(0)"
                                className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                                data-tooltip="Large"
                              >
                                1kg
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="checkout-items border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] mb-[24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={400}
                >
                  <div className="sub-title mb-[12px]">
                    <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                      Delivery Method
                    </h4>
                  </div>
                  <div className="checkout-method mb-[24px]">
                    <span className="details font-Poppins leading-[26px] tracking-[0.02rem] text-[15px] font-medium text-[#686e7d]">
                      Please select the preferred shipping method to use on this
                      order.
                    </span>
                    <div className="bb-del-option flex mt-[12px] max-[480px]:flex-col">
                      <div className="inner-del w-[50%] max-[480px]:w-full max-[480px]:mb-[8px]">
                        <span className="bb-del-head font-Poppins leading-[26px] tracking-[0.02rem] text-[15px] font-semibold text-[#3d4750]">
                          Free Shipping
                        </span>
                        <div className="radio-itens">
                          <input
                            type="radio"
                            id="rate1"
                            name="rate"
                            className="w-full text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"

                          />
                          <label
                            htmlFor="rate1"
                            className="relative pl-[26px] cursor-pointer leading-[16px] inline-block text-[#686e7d] tracking-[0]"
                          >
                            Rate - $0 .00
                          </label>
                        </div>
                      </div>
                      <div className="inner-del w-[50%] max-[480px]:w-full">
                        <span className="bb-del-head font-Poppins leading-[26px] tracking-[0.02rem] text-[15px] font-semibold text-[#3d4750]">
                          Flat Rate
                        </span>
                        <div className="radio-itens">
                          <input
                            type="radio"
                            id="rate2"
                            name="rate"
                            className="w-full text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                          />
                          <label
                            htmlFor="rate2"
                            className="relative pl-[26px] cursor-pointer leading-[16px] inline-block text-[#686e7d] tracking-[0]"
                          >
                            Rate - $5.00
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="about-order">
                    <h5 className="font-quicksand tracking-[0.03rem] leading-[1.2] mb-[12px] text-[15px] font-medium text-[#686e7d]">
                      Add Comments About Your Order
                    </h5>
                    <textarea
                      name="your-commemt"
                      placeholder="Comments"
                      className="w-full h-[100px] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div
                  className="checkout-items border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] mb-[24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={600}
                >
                  <div className="sub-title mb-[12px]">
                    <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                      Payment Method
                    </h4>
                  </div>
                  <div className="checkout-method mb-[24px]">
                    <span className="details font-Poppins leading-[26px] tracking-[0.02rem] text-[15px] font-medium text-[#686e7d]">
                      Please select the preferred shipping method to use on this
                      order.
                    </span>
                    <div className="bb-del-option mt-[12px] flex max-[480px]:flex-col">
                      <div className="inner-del w-[50%] max-[480px]:w-full">
                        <div className="radio-itens">
                          <input
                            type="radio"
                            id="Cash1"
                            name="radio-itens"
                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                          />
                          <label
                            htmlFor="Cash1"
                            className="relative pl-[26px] cursor-pointer leading-[16px] inline-block text-[#686e7d] tracking-[0]"
                          >
                            Cash On Delivery
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="about-order">
                    <h5 className="font-quicksand tracking-[0.03rem] leading-[1.2] mb-[12px] text-[15px] font-medium text-[#686e7d]">
                      Add Comments About Your Order
                    </h5>
                    <textarea
                      name="your-commemt"
                      placeholder="Comments"
                      className="w-full h-[100px] p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div
                  className="checkout-items border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] mb-[24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={800}
                >
                  <div className="sub-title mb-[12px]">
                    <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                      Payment Method
                    </h4>
                  </div>
                  <div className="payment-img">
                    <img
                      src="/img/payment/payment.png"
                      alt="payment"
                      className="w-full"
                    />
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

export default Checkout;
