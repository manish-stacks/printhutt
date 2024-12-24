"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiCheckFill, RiNotification3Fill, RiStackFill, RiTruckLine } from "react-icons/ri";


const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { items, getTotalPrice } = useCartStore();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [items]);



  return (
    <>
      {/* Breadcrumb */}

      <Breadcrumb title={"Checkout"} />

      {/* checkout */}
      <section className="section-checkout py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            {
              !isLoggedIn ? (
                <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
                  <div
                    className="bb-checkout-contact border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px]  bg-[#f1f3f6]"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={400}
                  >

                    <div className="bg-white mb-4 p-4 rounded shadow-sm">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <span className="w-8 h-8 rounded-full bg-[#29bc29] text-white flex items-center justify-center text-sm">1</span>
                          <span className="ml-2 font-medium text-[#29bc29] uppercase flex">LOGIN OR SIGNUP <RiCheckFill className="h-5 w-5 ms-4"/></span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#E10176] p-4">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <span className="w-8 h-8 rounded-full bg-white text-[#E10176] flex items-center justify-center text-sm">2</span>
                          <span className="ml-2 font-medium text-white uppercase">Delivery Address</span>
                        </div>
                      </div>
                    </div>


                    <div className=" bg-white px-5 py-5">
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


                      <div className="space-y-4">
                        <div className="py-4 max-w-full overflow-hidden border-s-4">
                          <div className="flex items-start justify-between space-x-4 max-[480px]:flex-col max-[480px]:space-x-0 max-[480px]:space-y-3">

                            {/* Radio Button */}
                            <div className="flex items-center checkout-radio">
                              <div className="radio-itens">
                                <input
                                  type="radio"
                                  id="address1"
                                  name="addresss"
                                  className="w-5 h-5 mr-2 border-gray-400 text-blue-500"
                                />
                              </div>

                            </div>

                            {/* Address Details */}
                            <div className="relative text-sm text-gray-700 pl-6 cursor-pointer w-full max-w-[calc(100%-100px)]">
                              <p className="font-medium flex items-center space-x-2  break-words">
                                <span>Manish Kumar</span>
                                <span className="bg-slate-100 px-3 py-1 rounded text-xs text-gray-600">Home</span>
                                <span className="font-bold text-black">6200027897</span>
                              </p>
                              <p className="mt-1 text-gray-600 break-words">
                                82A, Gali Number 11, C-Block, Saroop Vihar, New Delhi, Delhi
                              </p>
                            </div>

                            {/* Edit Button */}
                            <div className="ml-auto flex items-center w-full max-w-[100px] justify-end">
                              <a
                                href="#"
                                className="text-blue-500 font-semibold uppercase hover:text-blue-700 transition-colors duration-200"
                              >
                                Edit
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="py-4 max-w-full overflow-hidden border-s-4">
                          <div className="flex items-start justify-between space-x-4 max-[480px]:flex-col max-[480px]:space-x-0 max-[480px]:space-y-3">

                            {/* Radio Button */}
                            <div className="flex items-center checkout-radio">
                              <div className="radio-itens">
                                <input
                                  type="radio"
                                  id="address1"
                                  name="addresss"
                                  className="w-5 h-5 mr-2 border-gray-400 text-blue-500"
                                />
                              </div>

                            </div>

                            {/* Address Details */}
                            <div className="relative text-sm text-gray-700 pl-6 cursor-pointer w-full max-w-[calc(100%-100px)]">
                              <p className="font-medium flex items-center space-x-2  break-words">
                                <span>Manish Kumar</span>
                                <span className="bg-slate-100 px-3 py-1 rounded text-xs text-gray-600">Home</span>
                                <span className="font-bold text-black">6200027897</span>
                              </p>
                              <p className="mt-1 text-gray-600 break-words">
                                82A, Gali Number 11, C-Block, Saroop Vihar, New Delhi, Delhi
                              </p>
                            </div>

                            {/* Edit Button */}
                            <div className="ml-auto flex items-center w-full max-w-[100px] justify-end">
                              <a
                                href="#"
                                className="text-blue-500 font-semibold uppercase hover:text-blue-700 transition-colors duration-200"
                              >
                                Edit
                              </a>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="input-box-form mt-[20px]">
                        <form method="post">
                          <div className="flex flex-wrap mx-[-12px]">
                            <div className="min-[992px]:w-[50%] w-full px-[12px]">
                              <div className="input-item mb-[24px]">
                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Enter your Name"
                                  className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                                />
                              </div>
                            </div>
                            <div className="min-[992px]:w-[50%] w-full px-[12px]">
                              <div className="input-item mb-[24px]">
                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                  Mobile Number *
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Enter your Mobile Number"
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
                                  placeholder="Address (Area and Street)"
                                  className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                                />
                              </div>
                            </div>
                            <div className="min-[992px]:w-[50%] w-full px-[12px]">
                              <div className="input-item mb-[24px]">

                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                  City/District/Town *
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="City/District/Town"
                                  className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"

                                />
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

                            <div className="min-[992px]:w-[50%] w-full px-[12px]">
                              <div className="input-item mb-[24px]">
                                <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                                  Alternate Phone (Optional) *
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Alternate Phone (Optional)"
                                  className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                                />
                              </div>
                            </div>

                            <div className="checkout-radio flex mb-[10px] max-[480px]:flex-col  px-[12px]">
                              <div className="radio-itens mr-[20px]">
                                <input
                                  type="radio"
                                  id="address1"
                                  name="addressd"
                                  className="w-auto mr-[2px] p-[10px]"

                                />
                                <label
                                  htmlFor="address1"
                                  className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                >
                                  Home (All day delivery)
                                </label>
                              </div>
                              <div className="radio-itens">
                                <input
                                  type="radio"
                                  id="address2"
                                  name="addressd"
                                  className="w-auto mr-[2px] p-[10px]"
                                />
                                <label
                                  htmlFor="address2"
                                  className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                >
                                  Work (Delivery between 10 AM - 5 PM)
                                </label>
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
                </div>
              ) : (

                <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
                  <div
                    className="bb-checkout-contact border-[1px] border-solid border-[#eee] p-[20px] rounded  bg-[#f1f3f6]"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={400}
                  >

                    <div className="bg-[#E10176] p-4">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <span className="w-8 h-8 rounded-full bg-white text-[#E10176] flex items-center justify-center text-sm">1</span>
                          <span className="ml-2 font-medium text-white">LOGIN OR SIGNUP</span>
                        </div>
                      </div>
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white px-3 py-5">
                      {/* Login Form */}
                      <div className=" p-6">
                        <div className="mb-6">
                          <input
                            type="text"
                            placeholder="Enter Email/Mobile number"
                            className="w-full p-3 pl-0 text-md border-0 rounded-none border-b-2 border-[#2874f0]"
                          />
                        </div>
                        <div className="text-xs text-gray-500 mb-6">
                          <div className="flex items-start">
                            <span>
                              By continuing, you agree to Flipkart's{' '}
                              <a href="#" className="text-[#2874f0]">Terms of Use</a> and{' '}
                              <a href="#" className="text-[#2874f0]">Privacy Policy</a>.
                            </span>
                          </div>
                        </div>
                        <button className="w-full bg-blue-700 text-white py-3 rounded shadow-md hover:bg-[#E10176]/90 font-medium">
                          CONTINUE
                        </button>
                      </div>

                      {/* Advantages Section */}
                      <div className="p-6">
                        <h2 className="text-base text-gray-500 mb-6">Advantages of our secure login</h2>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="text-blue-700 mr-3 text-lg">
                              <RiTruckLine />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Easily Track Orders, Hassle free Returns</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="text-blue-700 mr-3 text-lg">
                              <RiNotification3Fill />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Get Relevant Alerts and Recommendation</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="text-blue-700 mr-3 text-lg">
                              <RiStackFill />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Wishlist, Reviews, Ratingsand more.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white my-4 p-4 rounded shadow-sm">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <span className="w-8 h-8 rounded-full bg-[#2874f0] text-white flex items-center justify-center text-sm">2</span>
                          <span className="ml-2 font-medium text-[#2874f0] uppercase">Delivery Address</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}


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
                      Summary
                    </h4>
                  </div>
                  <div className="checkout-summary mb-[20px] border-b-[1px] border-solid border-[#eee]">
                    <ul className="mb-[20px]">
                      <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          Sub-total
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          ₹{totalPrice.toFixed(2)}
                        </span>
                      </li>
                      <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          Delivery Charges
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          ₹{totalPrice.toFixed(2)}
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

                    {items.length === 0 ? (
                      <div>Your cart is empty</div>
                    ) : (
                      items.map(item => (
                        <div key={item._id} className="pro-items p-[15px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] flex mb-[24px] max-[420px]:flex-col">
                          <div className="image mr-[15px] max-[420px]:mr-[0] max-[420px]:mb-[15px]">
                            <Image
                              src={item.thumbnail.url}
                              alt={item.title}
                              width={100} height={100}
                              className="max-w-max w-[100px] h-[100px] border-[1px] border-solid border-[#eee] rounded-[20px] max-[1399px]:h-[80px] max-[1399px]:w-[80px]"
                            />
                          </div>
                          <div className="items-contact">
                            <h4 className="text-[16px]">
                              <a
                                href="javascript:void(0)"
                                className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]"
                              >
                                {item.title}
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
                                ₹{item.price} x {item.quantity}
                              </span>

                            </div>
                            <div className="bb-pro-variation">
                              <ul className="flex flex-wrap m-[-2px]">
                                <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal active">
                                  <span
                                    className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#ff] tracking-[0.03rem]"
                                    data-tooltip="Small"
                                  >
                                    ₹{item.quantity * item.price}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )))}
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
