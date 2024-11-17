'use client'

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";

function Products() {

  const [priceRange, setPriceRange] = useState([10, 100]);

  // Function to handle changes in the slider
  const handleSliderChange = (e:any) => {
    const newValue = e.target.value;
    
    // Ensure that both values are valid numbers and split them correctly
    const [min, max] = newValue.split(",").map((val:any) => parseInt(val, 10));
    
    // Update state only if the values are valid numbers
    if (!isNaN(min) && !isNaN(max)) {
      setPriceRange([min, max]);
    }
  };

  // Ensure that the values are numbers before passing to the input element
  const priceRangeStr = `$${priceRange[0]} - $${priceRange[1]}`;
  return (
    <>
      {/* Breadcrumb */}

      <Breadcrumb title={"Shop Page"} />

      {/* Shop section */}
      <section className="section-shop pb-[50px] max-[1199px]:pb-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="min-[992px]:w-[25%] w-full px-[12px] mb-[24px]">
              <div className="bb-shop-wrap bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] sticky top-[0]">
                <div className="bb-sidebar-block p-[20px] border-b-[1px] border-solid border-[#eee]">
                  <div className="bb-sidebar-title mb-[20px]">
                    <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750]">
                      Category
                    </h3>
                  </div>
                  <div className="bb-sidebar-contact">
                    <ul>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            clothes
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Bags
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Shoes
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Cosmetics
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Electrics
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Phone
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            Watch
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bb-sidebar-block p-[20px] border-b-[1px] border-solid border-[#eee]">
                  <div className="bb-sidebar-title mb-[20px]">
                    <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750]">
                      Weight
                    </h3>
                  </div>
                  <div className="bb-sidebar-contact">
                    <ul>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            200gm pack
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            500gm pack
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            1kg pack
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block mb-[14px]">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            5kg pack
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                      <li className="relative block">
                        <div className="bb-sidebar-block-item relative">
                          <input
                            type="checkbox"
                            className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                          />
                          <a
                            href="javascript:void(0)"
                            className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                          >
                            10kg pack
                          </a>
                          <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bb-sidebar-block p-[20px] border-b-[1px] border-solid border-[#eee]">
                  <div className="bb-sidebar-title mb-[20px]">
                    <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750]">
                      Color
                    </h3>
                  </div>
                  <div className="bb-color-contact">
                    <ul>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px] color-sidebar-active">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-1 w-[22px] h-[22px] block rounded-[20px] bg-[#c4d6f9]" />
                        </div>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px]">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-2 w-[22px] h-[22px] block rounded-[20px] bg-[#ff748b]" />
                        </div>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px]">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-3 w-[22px] h-[22px] block rounded-[20px] bg-[#000000]" />
                        </div>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px]">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-4 w-[22px] h-[22px] block rounded-[20px] bg-[#2bff4a]" />
                        </div>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px]">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-5 w-[22px] h-[22px] block rounded-[20px] bg-[#ff7c5e]" />
                        </div>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px]">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-6 w-[22px] h-[22px] block rounded-[20px] bg-[#f155ff]" />
                        </div>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px]">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-7 w-[22px] h-[22px] block rounded-[20px] bg-[#ffef00]" />
                        </div>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px]">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-8 w-[22px] h-[22px] block rounded-[20px] bg-[#c89fff]" />
                        </div>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px]">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-9 w-[22px] h-[22px] block rounded-[20px] bg-[#7bfffa]" />
                        </div>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out inline-block p-[2px] rounded-[20px] cursor-pointer mr-[5px] w-[26px] h-[26px]">
                        <div className="bb-sidebar-block-item relative">
                          <span className="pro-color-10 w-[22px] h-[22px] block rounded-[20px] bg-[#56ffc1]" />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bb-sidebar-block p-[20px] border-b-[1px] border-solid border-[#eee]">
                  <div className="bb-sidebar-title mb-[20px]">
                    <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750]">
                      Price
                    </h3>
                  </div>
                  <div className="bb-price-range">
                    <div className="price-range-slider relative w-full mb-[7px]">
                      <p className="range-value m-[0]">
                        <input
                          type="text"
                          id="amount"
                          readOnly
                          className="w-full bg-[#fff] text-[#000] text-[16px] mb-[15px] font-initial border-[1px] border-solid border-[#eee] p-[10px] text-center outline-[0] rounded-[10px]"
                        />
                      </p>
                      <div id="slider-range" className="range-bar" />
                    </div>
                  </div>
                </div>

                <div className="bb-sidebar-block p-[20px]">
                  <div className="bb-sidebar-title mb-[20px]">
                    <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750]">
                      Tags
                    </h3>
                  </div>
                  <div className="bb-tags">
                    <ul className="flex flex-wrap m-[-5px]">
                      <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                        >
                          Clothes
                        </a>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                        >
                          Fruits
                        </a>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                        >
                          Snacks
                        </a>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                        >
                          Dairy
                        </a>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                        >
                          Seafood
                        </a>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                        >
                          Toys
                        </a>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                        >
                          perfume
                        </a>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                        >
                          jewelry
                        </a>
                      </li>
                      <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                        <a
                          href="javascript:void(0)"
                          className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                        >
                          Bags
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-[992px]:w-[75%] w-full px-[12px] mb-[24px]">
              <div className="bb-shop-pro-inner">
                <div className="flex flex-wrap mx-[-12px] mb-[-24px]">
                  <div className="w-full px-[12px]">
                    <div className="bb-pro-list-top mb-[24px] rounded-[20px] flex bg-[#f8f8fb] border-[1px] border-solid border-[#eee] justify-between">
                      <div className="flex flex-wrap w-full">
                        <div className="w-[50%] px-[12px] max-[420px]:w-full">
                          <div className="bb-bl-btn py-[10px] flex max-[420px]:justify-center">
                            <button
                              type="button"
                              className="grid-btn btn-grid-100 h-[38px] w-[38px] flex justify-center items-center border-[0] p-[5px] bg-transparent mr-[5px] active"
                              title="grid"
                            >
                              <i className="ri-apps-line text-[20px]" />
                            </button>
                            <button
                              type="button"
                              className="grid-btn btn-list-100 h-[38px] w-[38px] flex justify-center items-center border-[0] p-[5px] bg-transparent"
                              title="grid"
                            >
                              <i className="ri-list-unordered text-[20px]" />
                            </button>
                          </div>
                        </div>
                        <div className="w-[50%] px-[12px] max-[420px]:w-full">
                          <div className="bb-select-inner h-full py-[10px] flex items-center justify-end max-[420px]:justify-center">
                            <div className="custom-select w-[130px] mr-[30px] flex justify-end text-[#777]  items-center text-[14px] relative max-[420px]:w-[100px] max-[420px]:justify-left">
                              <select defaultValue={1} className="p-1">
                                <option value={0} disabled> Sort by </option>
                                <option value={1}>Position</option>
                                <option value={2}>Relevance</option>
                                <option value={3}>Name, A to Z</option>
                                <option value={4}>Name, Z to A</option>
                                <option value={5}>Price, low to high</option>
                                <option value={6}>Price, high to low</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
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
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-1"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-1"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $15
                            </span>
                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                              $22
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
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={400}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                          <span className="text-[14px] text-[#777] font-medium uppercase">
                            Trend
                          </span>
                        </span>
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-2"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-2"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                            Juice
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
                            Organic Litchi Juice Pack
                          </a>
                        </h4>
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $25
                            </span>
                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                              $30
                            </span>
                          </div>
                          <span className="last-items text-[14px] text-[#686e7d]">
                            100ml
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={600}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-3"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-3"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                            Crunchy Banana Chips
                          </a>
                        </h4>
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $1
                            </span>
                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                              $02
                            </span>
                          </div>
                          <span className="last-items text-[14px] text-[#686e7d]">
                            100g
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={200}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-4"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-4"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $25
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
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={400}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-5"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-5"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $32
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
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={800}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                          <span className="text-[14px] text-[#777] font-medium uppercase">
                            Sale
                          </span>
                        </span>
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-6"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-6"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                            Small Cardamom Spice Pack
                          </a>
                        </h4>
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $41
                            </span>
                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                              $45
                            </span>
                          </div>
                          <span className="last-items text-[14px] text-[#686e7d]">
                            200g
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
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
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-7"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-7"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $29
                            </span>
                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                              $31
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
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={400}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-8"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-8"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                            Sauces
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
                            Tomato Ketchup Pack
                          </a>
                        </h4>
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $9
                            </span>
                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                              $10
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={600}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                          <span className="text-[14px] text-[#777] font-medium uppercase">
                            New
                          </span>
                        </span>
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-1"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-1"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $15
                            </span>
                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                              $22
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
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={200}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <span className="flags transition-all duration-[0.3s] ease-in-out absolute z-[5] top-[10px] left-[6px]">
                          <span className="text-[14px] text-[#777] font-medium uppercase">
                            Trend
                          </span>
                        </span>
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-2"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-2"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                            Juice
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
                            Organic Litchi Juice Pack
                          </a>
                        </h4>
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $25
                            </span>
                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                              $30
                            </span>
                          </div>
                          <span className="last-items text-[14px] text-[#686e7d]">
                            100ml
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={400}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-3"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-3"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                            Crunchy Banana Chips
                          </a>
                        </h4>
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $1
                            </span>
                            <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                              $02
                            </span>
                          </div>
                          <span className="last-items text-[14px] text-[#686e7d]">
                            100g
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content"
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={600}
                  >
                    <div className="bb-pro-box bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[20px]">
                      <div className="bb-pro-img overflow-hidden relative border-b-[1px] border-solid border-[#eee] z-[4]">
                        <a href="javascript:void(0)">
                          <div className="inner-img relative block overflow-hidden pointer-events-none rounded-t-[20px]">
                            <img
                              className="main-img transition-all duration-[0.3s] ease-in-out w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-4"
                            />
                            <img
                              className="hover-img transition-all duration-[0.3s] ease-in-out absolute z-[2] top-[0] left-[0] opacity-[0] w-full"
                              src="https://printhutt.com/media/product/347457733_1.png"
                              alt="product-4"
                            />
                          </div>
                        </a>
                        <ul className="bb-pro-actions transition-all duration-[0.3s] ease-in-out my-[0] mx-[auto] absolute z-[9] left-[0] right-[0] bottom-[0] flex flex-row items-center justify-center opacity-[0]">
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
                              title="Wishlist"
                              className="w-[35px] h-[35px] flex items-center justify-center"
                            >
                              <i className="ri-heart-line transition-all duration-[0.3s] ease-in-out text-[18px] text-[#777] leading-[10px]" />
                            </a>
                          </li>
                          <li className="bb-btn-group transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px]">
                            <a
                              href="javascript:void(0)"
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
                              href="javascript:void(0)"
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
                        <p className="hidden font-Poppins text-[14px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Cumque consectetur sit mollitia nihil magnam
                          perspiciatis eos atque qui cupiditate delectus.
                          Provident totam optio sapiente nam.
                        </p>
                        <div className="bb-price flex flex-wrap justify-between">
                          <div className="inner-price mx-[-3px]">
                            <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                              $25
                            </span>
                            <span className="item-left px-[3px] text-[14px] text-[#6c7fd8]">
                              Out Of Stock
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-[12px]">
                    <div className="bb-pro-pagination mb-[24px] flex justify-between max-[575px]:flex-col max-[575px]:items-center">
                      <p className="font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem] max-[575px]:mb-[10px]">
                        Showing 1-12 of 21 item(s)
                      </p>
                      <ul className="flex">
                        <li className="leading-[28px] mr-[6px] active">
                          <a
                            href="javascript:void(0)"
                            className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                          >
                            1
                          </a>
                        </li>
                        <li className="leading-[28px] mr-[6px]">
                          <a
                            href="javascript:void(0)"
                            className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                          >
                            2
                          </a>
                        </li>
                        <li className="leading-[28px] mr-[6px]">
                          <a
                            href="javascript:void(0)"
                            className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                          >
                            3
                          </a>
                        </li>
                        <li className="leading-[28px] mr-[6px]">
                          <a
                            href="javascript:void(0)"
                            className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                          >
                            4
                          </a>
                        </li>
                        <li className="leading-[28px]">
                          <a
                            href="javascript:void(0)"
                            className="next transition-all duration-[0.3s] ease-in-out w-[auto] h-[32px] px-[13px] font-light text-[#fff] leading-[30px] bg-[#3d4750] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee]"
                          >
                            Next{" "}
                            <i className="ri-arrow-right-s-line transition-all duration-[0.3s] ease-in-out ml-[10px] text-[16px] w-[8px] text-[#fff]" />
                          </a>
                        </li>
                      </ul>
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
}

export default Products;
