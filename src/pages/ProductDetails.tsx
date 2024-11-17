"use client";
import React from "react";
import SingleProductSlider from "@/components/SingleProductSlider";
import ProductSlider from "@/components/ProductSlider";
import Breadcrumb from "@/components/Breadcrumb";

const ProductDetails = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Product Page"} />
      {/* product page */}
      <section className="section-product py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div className="bb-single-pro mb-[24px]">
                <div className="flex flex-wrap mx-[-12px]">
                  <div className="min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]">
                    <SingleProductSlider />
                  </div>
                  <div className="min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
                    <div className="bb-single-pro-contact">
                      <div className="bb-sub-title mb-[20px]">
                        <h4 className="font-quicksand text-[22px] tracking-[0.03rem] font-bold leading-[1.2] text-[#3d4750]">
                          Ground Nuts Oil Pack 52g
                        </h4>
                      </div>
                      <div className="bb-single-rating mb-[12px]">
                        <span className="bb-pro-rating mr-[10px]">
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                          <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                        </span>
                        <span className="bb-read-review">
                          |&nbsp;&nbsp;
                          <a
                            href="#bb-spt-nav-review"
                            className="font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem] text-[#6c7fd8]"
                          >
                            992 Ratings
                          </a>
                        </span>
                      </div>
                      <p className="font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quas nihil laboriosam voluptatem ab consectetur
                        dolorum id, soluta sunt at culpa commodi totam quod
                        natus qui!
                      </p>
                      <div className="bb-single-price-wrap flex justify-between py-[10px]">
                        <div className="bb-single-price py-[15px]">
                          <div className="price mb-[8px]">
                            <h5 className="font-quicksand leading-[1.2] tracking-[0.03rem] text-[20px] font-extrabold text-[#3d4750]">
                              $923.00{" "}
                              <span className="text-[#3d4750] text-[20px]">
                                -78%
                              </span>
                            </h5>
                          </div>
                          <div className="mrp">
                            <p className="font-Poppins text-[16px] font-light text-[#686e7d] leading-[28px] tracking-[0.03rem]">
                              M.R.P. :{" "}
                              <span className="text-[15px] line-through">
                                $1,999.00
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="bb-single-price py-[15px]">
                          <div className="sku mb-[8px]">
                            <h5 className="font-quicksand text-[18px] font-extrabold leading-[1.2] tracking-[0.03rem] text-[#3d4750]">
                              SKU#: WH12
                            </h5>
                          </div>
                          <div className="stock">
                            <span className="text-[18px] text-[#6c7fd8]">
                              In stock
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bb-single-list mb-[30px]">
                        <ul className="my-[-8px] pl-[18px]">
                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Closure :
                            </span>{" "}
                            Hook &amp; Loop
                          </li>
                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Sole :
                            </span>{" "}
                            Polyvinyl Chloride
                          </li>
                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Width :
                            </span>{" "}
                            Medium
                          </li>
                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Outer Material :
                            </span>{" "}
                            A-Grade Standard Quality
                          </li>
                        </ul>
                      </div>
                      <div className="bb-single-pro-weight mb-[24px]">
                        <div className="pro-title mb-[12px]">
                          <h4 className="font-quicksand leading-[1.2] tracking-[0.03rem] text-[16px] font-bold uppercase text-[#3d4750]">
                            Weight
                          </h4>
                        </div>
                        <div className="bb-pro-variation-contant">
                          <ul className="flex flex-wrap m-[-2px]">
                            <li className="my-[10px] mx-[2px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] cursor-pointer active-variation">
                              <span className="font-Poppins text-[#686e7d] font-light text-[14px] leading-[28px] tracking-[0.03rem]">
                                250g
                              </span>
                            </li>
                            <li className="my-[10px] mx-[2px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] cursor-pointer">
                              <span className="font-Poppins text-[#686e7d] font-light text-[14px] leading-[28px] tracking-[0.03rem]">
                                500g
                              </span>
                            </li>
                            <li className="my-[10px] mx-[2px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] cursor-pointer">
                              <span className="font-Poppins text-[#686e7d] font-light text-[14px] leading-[28px] tracking-[0.03rem]">
                                1kg
                              </span>
                            </li>
                            <li className="my-[10px] mx-[2px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] cursor-pointer">
                              <span className="font-Poppins text-[#686e7d] font-light text-[14px] leading-[28px] tracking-[0.03rem]">
                                2kg
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="bb-single-qty flex flex-wrap m-[-2px]">
                        <div className="qty-plus-minus m-[2px] w-[85px] h-[40px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]">
                          <div className="dec bb-qtybtn">-</div>
                          <input
                            className="qty-input text-[#777] float-left text-[14px] h-auto m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                            type="text"
                            name="bb-qtybtn"
                            defaultValue={1}
                          />
                          <div className="inc bb-qtybtn">+</div>
                        </div>
                        <div className="buttons m-[2px]">
                          <a
                            href="javascript:void(0)"
                            className="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] flex font-Poppins leading-[28px] tracking-[0.03rem] py-[6px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                          >
                            View Cart
                          </a>
                        </div>
                        <ul className="bb-pro-actions my-[2px] flex">
                          <li className="bb-btn-group">
                            <a
                              href="javascript:void(0)"
                              title="heart"
                              className="transition-all duration-[0.3s] ease-in-out w-[40px] h-[40px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] hover:bg-[#6c7fd8] border-[1px] border-solid border-[#eee] rounded-[10px]"
                            >
                              <i className="ri-heart-line text-[16px] leading-[10px] text-[#777]" />
                            </a>
                          </li>
                          <li className="bb-btn-group">
                            <a
                              href="javascript:void(0)"
                              title="Quick View"
                              className="bb-modal-toggle transition-all duration-[0.3s] ease-in-out w-[40px] h-[40px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] hover:bg-[#6c7fd8] border-[1px] border-solid border-[#eee] rounded-[10px]"
                            >
                              <i className="ri-eye-line text-[16px] leading-[10px] text-[#777]" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bb-single-pro-tab">
                <div className="bb-pro-tab mb-[24px]">
                  <ul
                    className="bb-pro-tab-nav flex flex-wrap mx-[-20px] max-[991px]:justify-center"
                    id="ProTab"
                  >
                    <li className="nav-item relative leading-[28px]">
                      <a
                        className="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block active"
                        href="#detail"
                      >
                        Detail
                      </a>
                    </li>
                    <li className="nav-item relative leading-[28px]">
                      <a
                        className="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                        href="#information"
                      >
                        Information
                      </a>
                    </li>
                    <li className="nav-item relative leading-[28px]">
                      <a
                        className="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                        href="#reviews"
                      >
                        Reviews
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div className="tab-pro-pane" id="detail">
                    <div className="bb-inner-tabs border-[1px] border-solid border-[#eee] p-[15px] rounded-[20px]">
                      <div className="bb-details">
                        <p className="mb-[12px] font-Poppins text-[#686e7d] leading-[28px] tracking-[0.03rem] font-light">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Libero, voluptatum. Vitae dolores alias repellat
                          eligendi, officiis, exercitationem corporis quisquam
                          delectus cum non recusandae numquam dignissimos
                          molestiae magnam hic natus. Cumque.
                        </p>
                        <div className="details-info">
                          <ul className="list-disc pl-[20px] mb-[0]">
                            <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                              Any Product types that You want - Simple,
                              Configurable
                            </li>
                            <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                              Downloadable/Digital Products, Virtual Products
                            </li>
                            <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                              Inventory Management with Backordered items
                            </li>
                            <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                              Flatlock seams throughout.
                            </li>
                          </ul>
                          <ul className="list-disc pl-[20px] mb-[0]">
                            <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                              <span className="inline-flex font-medium min-w-[150px]">
                                Highlights
                              </span>
                              Form FactorWhole
                            </li>
                            <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                              <span className="inline-flex font-medium min-w-[150px]">
                                Seller
                              </span>
                              No Returns Allowed
                            </li>
                            <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                              <span className="inline-flex font-medium min-w-[150px]">
                                Services
                              </span>
                              Cash on Delivery available
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pro-pane hidden" id="information">
                    <div className="bb-inner-tabs border-[1px] border-solid border-[#eee] p-[15px] rounded-[20px]">
                      <div className="information">
                        <ul className="list-disc pl-[20px]">
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Weight
                            </span>{" "}
                            500 g
                          </li>
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Dimensions
                            </span>{" "}
                            17 × 15 × 3 cm
                          </li>
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Color
                            </span>{" "}
                            black,yellow,red
                          </li>
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Brand
                            </span>{" "}
                            Wonder Fort
                          </li>
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Form Factor
                            </span>
                            Whole
                          </li>
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Quantity
                            </span>
                            1
                          </li>
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Container Type
                            </span>
                            Pouch
                          </li>
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Shelf Life
                            </span>
                            12 Months
                          </li>
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Ingredients
                            </span>
                            Dalchini, Dhaniya, Badi Elaichi, Laung
                          </li>
                          <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                            <span className="inline-flex min-w-[130px] font-medium">
                              Other Features
                            </span>
                            Ingredient Type: Vegetarian
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pro-pane hidden" id="reviews">
                    <div className="bb-inner-tabs border-[1px] border-solid border-[#eee] p-[15px] rounded-[20px]">
                      <div className="bb-reviews">
                        <div className="reviews-bb-box flex mb-[24px] max-[575px]:flex-col">
                          <div className="inner-image mr-[12px] max-[575px]:mr-[0] max-[575px]:mb-[12px]">
                            <img
                              src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/reviews/1.jpg"
                              alt="img-1"
                              className="w-[50px] h-[50px] max-w-[50px] rounded-[10px]"
                            />
                          </div>
                          <div className="inner-contact">
                            <h4 className="font-quicksand leading-[1.2] tracking-[0.03rem] mb-[5px] text-[16px] font-bold text-[#3d4750]">
                              Mariya Lykra
                            </h4>
                            <div className="bb-pro-rating flex">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                            </div>
                            <p className="font-Poppins text-[14px] leading-[26px] font-light tracking-[0.03rem] text-[#686e7d]">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Illo, hic expedita asperiores eos neque
                              cumque impedit quam, placeat laudantium soluta
                              repellendus possimus a distinctio voluptate
                              veritatis nostrum perspiciatis est! Commodi!
                            </p>
                          </div>
                        </div>
                        <div className="reviews-bb-box flex mb-[24px] max-[575px]:flex-col">
                          <div className="inner-image mr-[12px] max-[575px]:mr-[0] max-[575px]:mb-[12px]">
                            <img
                              src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/reviews/1.jpg"
                              alt="img-2"
                              className="w-[50px] h-[50px] max-w-[50px] rounded-[10px]"
                            />
                          </div>
                          <div className="inner-contact">
                            <h4 className="font-quicksand leading-[1.2] tracking-[0.03rem] mb-[5px] text-[16px] font-bold text-[#3d4750]">
                              Saddika Alard
                            </h4>
                            <div className="bb-pro-rating flex">
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                              <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                              <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                            </div>
                            <p className="font-Poppins text-[14px] leading-[26px] font-light tracking-[0.03rem] text-[#686e7d]">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Illo, hic expedita asperiores eos neque
                              cumque impedit quam, placeat laudantium soluta
                              repellendus possimus a distinctio voluptate
                              veritatis nostrum perspiciatis est! Commodi!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bb-reviews-form">
                        <h3 className="font-quicksand tracking-[0.03rem] leading-[1.2] mb-[8px] text-[20px] font-bold text-[#3d4750]">
                          Add a Review
                        </h3>
                        <div className="bb-review-rating flex mb-[12px]">
                          <span className="pr-[10px] font-Poppins text-[15px] font-semibold leading-[26px] tracking-[0.02rem] text-[#3d4750]">
                            Your ratting :
                          </span>
                          <div className="bb-pro-rating">
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                            <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                          </div>
                        </div>
                        <form action="#">
                          <div className="input-box mb-[24px]">
                            <input
                              type="text"
                              placeholder="Name"
                              name="your-name"
                              className="w-full h-[50px] border-[1px] border-solid border-[#eee] pl-[20px] outline-[0] text-[14px] font-normal text-[#777] rounded-[20px] p-[10px]"
                            />
                          </div>
                          <div className="input-box mb-[24px]">
                            <input
                              type="email"
                              placeholder="Email"
                              name="your-email"
                              className="w-full h-[50px] border-[1px] border-solid border-[#eee] pl-[20px] outline-[0] text-[14px] font-normal text-[#777] rounded-[20px] p-[10px]"
                            />
                          </div>
                          <div className="input-box mb-[24px]">
                            <textarea
                              name="your-comment"
                              placeholder="Enter Your Comment"
                              className="w-full h-[100px] border-[1px] border-solid border-[#eee] py-[20px] pl-[20px] pr-[10px] outline-[0] text-[14px] font-normal text-[#777] rounded-[20px] p-[10px]"
                              defaultValue={""}
                            />
                          </div>
                          <div className="input-button">
                            <a
                              href="javascript:void(0)"
                              className="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] inline-flex font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[15px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                            >
                              View Cart
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Related product section */}
      <section className="section-related-product py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div
                className="section-title mb-[20px] pb-[20px] z-[5] relative flex flex-col items-center text-center max-[991px]:pb-[0]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="section-detail max-[991px]:mb-[12px]">
                  <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                    Related <span className="text-[#6c7fd8]">Product</span>
                  </h2>
                  <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                    Browse The Collection of Top Products.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-[12px]">
              <div className="bb-deal-slider m-[-12px]">
                <div className="bb-deal-block">
                  <ProductSlider/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;