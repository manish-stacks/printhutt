import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

const Compare = () => {
  return (
    <>
      {/* Breadcrumb */}

      <Breadcrumb title={"Compare"} />

      {/* Compare */}
      <section className="section-compare py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div className="bb-compare overflow-auto">
                <ul className="bb-compare-main-box flex">
                  <li className="bb-compare-inner-rows">
                    <ul className="bb-compare-inner-box border-l-[1px] border-t-[1px] border-b-[1px] border-solid border-[#eee] w-[323px] max-[991px]:w-[250px]">
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-img h-[250px] m-auto flex items-center justify-center">
                          <p className="font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                            Products image
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-title p-[20px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            Name
                          </h5>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-title p-[20px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            Category
                          </h5>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-title p-[20px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            Ratings
                          </h5>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-title p-[20px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            Availability
                          </h5>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-title p-[20px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            location
                          </h5>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-title p-[20px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            Brand
                          </h5>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-title p-[20px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            SKU
                          </h5>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-title p-[20px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            Quantity
                          </h5>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-title p-[20px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            Weight
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="compare-pro-title compare-description p-[20px] h-[135px]">
                          <h5 className="font-quicksand tracking-[0.03rem] text-[16px] leading-[24px] font-bold text-[#3d4750]">
                            Description
                          </h5>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="bb-compare-inner-rows bb-compare-box">
                    <ul className="bb-compare-inner-box border-l-[1px] border-t-[1px] border-b-[1px] border-solid border-[#eee] w-[323px] max-[991px]:w-[250px]">
                      <li className="inner-image relative bg-[#fff] borderb-[1px] border-solid border-[#eee]">
                        <span className="bb-remove-compare absolute top-[20px] right-[20px]">
                          <a href="javascript:void(0)">
                            <i className="ri-close-circle-fill transition-all duration-[0.3s] ease-in-out text-[22px] text-[#686e7d] hover:text-[#6c7fd8]" />
                          </a>
                        </span>
                        <div className="compare-pro-img h-[250px] m-[auto] flex items-center justify-center">
                          <img
                            src="https://printhutt.com/media/product/125520269_Jai%20Shri%20Ram.jpg"
                            alt="products-1"
                            className="h-full max-[991px]:w-full"
                          />
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Ground Nuts Oil Pack
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Snacks
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail flex p-[20px]">
                          <span className="bb-pro-rating">
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                          </span>
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            (10 Review)
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="in-stock font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#6c7fd8]">
                            In Stock
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            In Store , Online
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Bhisma Organics
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            54786
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            1 Pack
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            1 Kg
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="compare-pro-title p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit necessitatibus possimus libero enim.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="bb-compare-inner-rows bb-compare-box">
                    <ul className="bb-compare-inner-box border-l-[1px] border-t-[1px] border-b-[1px] border-solid border-[#eee] w-[323px] max-[991px]:w-[250px]">
                      <li className="inner-image relative bg-[#fff] borderb-[1px] border-solid border-[#eee]">
                        <span className="bb-remove-compare absolute top-[20px] right-[20px]">
                          <a href="javascript:void(0)">
                            <i className="ri-close-circle-fill transition-all duration-[0.3s] ease-in-out text-[22px] text-[#686e7d] hover:text-[#6c7fd8]" />
                          </a>
                        </span>
                        <div className="compare-pro-img h-[250px] m-[auto] flex items-center justify-center">
                          <img
                            src="https://printhutt.com/media/product/125520269_Jai%20Shri%20Ram.jpg"
                            alt="products-2"
                            className="h-full max-[991px]:w-full"
                          />
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Organic Litchi Juice Pack
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Juice
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail flex p-[20px]">
                          <span className="bb-pro-rating">
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                          </span>
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            (15 Review)
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="out-stock font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#ffa5a5]">
                            Out Of Stock
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Online
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Darsh Mart
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            851287
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            1 Pack
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            5 Kg
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="compare-pro-title p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit necessitatibus possimus libero enim.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="bb-compare-inner-rows bb-compare-box">
                    <ul className="bb-compare-inner-box border-l-[1px] border-t-[1px] border-b-[1px] border-solid border-[#eee] w-[323px] max-[991px]:w-[250px]">
                      <li className="inner-image relative bg-[#fff] borderb-[1px] border-solid border-[#eee]">
                        <span className="bb-remove-compare absolute top-[20px] right-[20px]">
                          <a href="javascript:void(0)">
                            <i className="ri-close-circle-fill transition-all duration-[0.3s] ease-in-out text-[22px] text-[#686e7d] hover:text-[#6c7fd8]" />
                          </a>
                        </span>
                        <div className="compare-pro-img h-[250px] m-[auto] flex items-center justify-center">
                          <img
                            src="https://printhutt.com/media/product/125520269_Jai%20Shri%20Ram.jpg"
                            alt="products-3"
                            className="h-full max-[991px]:w-full"
                          />
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Crunchy Banana Chips
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Chips
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail flex p-[20px]">
                          <span className="bb-pro-rating">
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                          </span>
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            (20 Review)
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="in-stock font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#6c7fd8]">
                            In Stock
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            In Store
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Peoples Store
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            865248
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            3 Pack
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            500 Gram
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="compare-pro-title p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit necessitatibus possimus libero enim.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="bb-compare-inner-rows bb-compare-box">
                    <ul className="bb-compare-inner-box border-l-[1px] border-t-[1px] border-b-[1px] border-solid border-[#eee] w-[323px] max-[991px]:w-[250px]">
                      <li className="inner-image relative bg-[#fff] borderb-[1px] border-solid border-[#eee]">
                        <span className="bb-remove-compare absolute top-[20px] right-[20px]">
                          <a href="javascript:void(0)">
                            <i className="ri-close-circle-fill transition-all duration-[0.3s] ease-in-out text-[22px] text-[#686e7d] hover:text-[#6c7fd8]" />
                          </a>
                        </span>
                        <div className="compare-pro-img h-[250px] m-[auto] flex items-center justify-center">
                          <img
                            src="https://printhutt.com/media/product/125520269_Jai%20Shri%20Ram.jpg"
                            alt="products-4"
                            className="h-full max-[991px]:w-full"
                          />
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Crunchy Potato Chips
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Chips
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail flex p-[20px]">
                          <span className="bb-pro-rating">
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                            <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                          </span>
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            (5 Review)
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="in-stock">In Stock</p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            In Store
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Peoples Store
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            587635
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            1 Pack
                          </p>
                        </div>
                      </li>
                      <li className="border-b-[1px] border-solid border-[#eee]">
                        <div className="compare-pro-detail p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            200 Gram
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="compare-pro-title p-[20px]">
                          <p className="font-Poppins tracking-[0.03rem] text-[15px] leading-[24px] font-normal text-[#686e7d]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit necessitatibus possimus libero enim.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Compare;
