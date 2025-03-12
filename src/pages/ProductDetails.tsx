"use client";
import React, { useEffect, useState } from "react";
import SingleProductSlider from "@/components/SingleProductSlider";
// import ProductSlider from "@/components/ProductSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "react-toastify";
import CartSidebar from "@/components/CartSidebar";
import type { Product } from "@/lib/types/product";
import { formatCurrency } from "@/helpers/helpers";
import ProductSlider from "@/components/ProductSlider";
import useQuickStore from "@/store/useQuickStore";
import Link from "next/link";

interface ProductProps {
  product: Product | null;
  relatedProduct: Product[];
}
const ProductDetails = ({ product, relatedProduct }: ProductProps) => {

  const [activeDetails, setActiveDetails] = useState(true);
  const [activeInformation, setActiveInformation] = useState(false);
  const [activeReviews, setActiveReviews] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  // const { items } = useCartStore();
  const [isCartOpen, setIsOpenCart] = useState(false);
  const items = useCartStore((state) => state.items);
  const toggelCartSidebarClose = () => setIsOpenCart(false);
  const [quantity, setQuantity] = useState(1);
  const [activeVarient, setActiveVarient] = useState(product?.varient[0]?._id || '0');
  const handleAddToCart = () => {
    if (!product || quantity <= 0) {
      toast.error('Please select quantity');
      return;
    }
    addToCart(product, quantity);
    setIsOpenCart(true);
    //toast('Added to cart');
  }

  // console.log(product)

  const item = items.find(item => item._id === product?._id) || { _id: '', quantity: 0 };


  const onchangeVarient = (id: string) => {
    setActiveVarient(id)
    const varient = product?.varient.find(item => item._id === id);
    product.price = varient?.price || 0
    // console.log(varient);
  }
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    //toast.info('Updated quantity');
  };

  const viwCart = () => {
    setIsOpenCart(true);
  }

  useEffect(() => {
    useQuickStore.setState({ isOpen: false });
  })

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Product Page"} />
      {/* product page */}
      <section className="section-product py-[50px] max-[1199px]:py-[35px] overflow-hidden">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full px-[12px]">
              <div className="bb-single-pro mb-[24px]">
                <div className="flex flex-wrap mx-[-12px]">
                  <div className="min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]">
                    <SingleProductSlider product={product} />
                  </div>
                  <div className="min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
                    <div className="bb-single-pro-contact">
                      <div className="bb-sub-title mb-[20px]">
                        <h4 className="font-quicksand text-[22px] tracking-[0.03rem] font-bold leading-[1.2] text-[#3d4750]">
                          {product?.title}
                        </h4>
                      </div>

                      <div className="bb-single-rating mb-[12px]">
                        <span className="bb-pro-rating mr-[10px]">
                          {Array.from({ length: 5 }, (_, index) => (
                            <i
                              key={index}
                              className={`float-left text-[15px] mr-[3px] leading-[18px] ${index < Math.round(product?.rating)
                                ? "ri-star-fill text-[#fea99a]"
                                : "ri-star-line text-[#777]"
                                }`}
                            />
                          ))}
                        </span>
                        <span className="bb-read-review">
                          |&nbsp;&nbsp;<a href="#bb-spt-nav-review" className="font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem] text-[#6c7fd8]">992 Ratings</a>
                        </span>
                      </div>

                      <p className="font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem]">
                        {product?.short_description}
                      </p>



                      {/* start mobile only view */}
                      <div className="bb-single-qty flex flex-wrap m-[-2px] my-4 sm:hidden">
                        <div className="buttons m-[2px]">
                          {
                            product?.isCustomize ?
                              (
                                <Link
                                  href={product?.customizeLink}
                                  className="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] flex font-Poppins leading-[28px] tracking-[0.03rem] py-[6px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                >
                                  Customize & Buy
                                </Link>
                              ) : (
                                item.quantity > 0 ? (
                                  <button
                                    onClick={() => viwCart()}
                                    className="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] flex font-Poppins leading-[28px] tracking-[0.03rem] py-[6px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                  >
                                    View Cart
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleAddToCart()}
                                    className="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] flex font-Poppins leading-[28px] tracking-[0.03rem] py-[6px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                  >
                                    Add to Cart
                                  </button>
                                )
                              )
                          }
                        </div>
                        <ul className="bb-pro-actions my-[2px] flex ">
                          <li className="bb-btn-group">
                            <a

                              title="heart"
                              className="transition-all duration-[0.3s] ease-in-out w-[40px] h-[40px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] hover:bg-[#6c7fd8] border-[1px] border-solid border-[#eee] rounded-[10px]"
                            >
                              <i className="ri-heart-line text-[16px] leading-[10px] text-[#777]" />
                            </a>
                          </li>

                        </ul>
                      </div>
                      {/* end mobile only view */}


                      {product?.showPrice && (
                        <div className="bb-single-price-wrap flex justify-between py-[10px]">
                          <div className="bb-single-price py-[15px]">
                            <div className="price mb-[8px]">
                              <h5 className="font-quicksand leading-[1.2] tracking-[0.03rem] text-[20px] font-extrabold text-green-800">
                                {product?.price &&
                                  formatCurrency(
                                    product.discountType === "percentage"
                                      ? product.price - (product.price * product.discountPrice) / 100
                                      : product.price - (product.discountPrice || 0)
                                  )}

                                {product?.discountPrice > 0 && (
                                  <span className="text-[#3d4750] text-[20px]">
                                    - {product.discountType === "percentage"
                                      ? `${product.discountPrice}%`
                                      : `${product.discountPrice.toFixed(2)}₹`}
                                  </span>
                                )}


                              </h5>
                            </div>
                            {product?.discountPrice > 0 && (
                              <div className="mrp">
                                <p className="font-Poppins text-[16px] font-light leading-[28px] tracking-[0.03rem] text-rose-600">
                                  M.R.P. : <span className="text-[15px] line-through">{product.price.toFixed(2)}</span>
                                </p>
                              </div>
                            )}

                          </div>
                          <div className="bb-single-price py-[15px]">
                            <div className="sku mb-[8px]">
                              <h5 className="font-quicksand text-[18px] font-extrabold leading-[1.2] tracking-[0.03rem] text-[#3d4750]">
                                SKU#: {product?.sku}
                              </h5>
                            </div>
                            <div className="stock">
                              <span className="text-[18px] text-[#6c7fd8]">

                                {
                                  product?.stock > 0
                                    ? `In stock`
                                    : 'Out of stock'
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      )}


                      <div className="bb-single-list mb-[30px]">
                        <ul className="my-[-8px] pl-[18px]">
                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Brand :
                            </span>{" "}
                            {product?.brand}
                          </li>
                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Dimensions :
                            </span>{" "}
                            {product?.dimensions}
                          </li>
                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Delivery :
                            </span>{" "}
                            5-8 Days or Depends on Location
                          </li>

                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Outer Material :
                            </span>{" "}
                            A-Grade Standard Quality
                          </li>
                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Offers :
                            </span>{" "}
                            {product?.offers?.map((offer) => offer.offerTitle).join(', ') || 'No offers available'}
                          </li>
                          <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                            <span className="font-Poppins text-[#777] text-[14px]">
                              Shipping :
                            </span>{" "}
                            {product?.shippingFee || 'Free Shipping'}
                          </li>
                          {
                            product?.weight > 0 && (
                              <li className="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc">
                                <span className="font-Poppins text-[#777] text-[14px]">
                                  Weight :
                                </span>{" "}
                                {product?.weight}g
                              </li>
                            )
                          }

                        </ul>
                      </div>
                      {
                        product?.isVarientStatus && (
                          <div className="bb-single-pro-weight mb-[24px]">
                            <div className="pro-title mb-[12px]">
                              <h4 className="font-quicksand leading-[1.2] tracking-[0.03rem] text-[16px] font-bold uppercase text-[#3d4750]">
                                Varient
                              </h4>
                            </div>
                            <div className="bb-pro-variation-contant">
                              <ul className="flex flex-wrap m-[-2px]">
                                {product?.varient.map((v, index) => (
                                  <li key={index} className={`my-[10px] mx-[2px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] cursor-pointer ${activeVarient === v?._id ? 'active-variation' : ''}`}>
                                    <span onClick={() => onchangeVarient(v?._id)} className="font-Poppins text-[#686e7d] font-light text-[14px] leading-[28px] tracking-[0.03rem]">
                                      {v.size}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )
                      }


                      {/* start md,lg screen only view */}
                      <div className="bb-single-qty hidden flex-wrap m-[-2px] sm:flex">
                        {
                          !product?.isCustomize &&
                          <div className="qty-plus-minus m-[2px] w-[85px] h-[40px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]">
                            <div className="dec bb-qtybtn" onClick={() => handleQuantityChange(-1)}>-</div>
                            <input
                              className="qty-input text-[#777] float-left text-[14px] h-auto m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                              type="text"
                              name="bb-qtybtn"
                              value={quantity}
                              min="1"
                              readOnly
                              onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            <div className="inc bb-qtybtn" onClick={() => handleQuantityChange(1)}>+</div>
                          </div>
                        }
                        <div className="buttons m-[2px]">
                          {
                            product?.isCustomize ?
                              (
                                <Link
                                  href={product?.customizeLink}
                                  className="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] flex font-Poppins leading-[28px] tracking-[0.03rem] py-[6px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                >
                                  Customize & Buy
                                </Link>
                              ) : (
                                item.quantity > 0 ? (
                                  <button
                                    onClick={() => viwCart()}
                                    className="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] flex font-Poppins leading-[28px] tracking-[0.03rem] py-[6px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                  >
                                    View Cart
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleAddToCart()}
                                    className="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] flex font-Poppins leading-[28px] tracking-[0.03rem] py-[6px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                  >
                                    Add to Cart
                                  </button>


                                )
                              )
                          }

                        </div>
                        <ul className="bb-pro-actions my-[2px] flex">
                          <li className="bb-btn-group">
                            <a

                              title="heart"
                              className="transition-all duration-[0.3s] ease-in-out w-[40px] h-[40px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] hover:bg-[#6c7fd8] border-[1px] border-solid border-[#eee] rounded-[10px]"
                            >
                              <i className="ri-heart-line text-[16px] leading-[10px] text-[#777]" />
                            </a>
                          </li>

                        </ul>
                      </div>
                      {/* end md,lg screen only view */}
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
                      <button
                        className={`nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block ${activeDetails && 'active text-[#6c7fd8]'}`}
                        data-tab="detail"
                        onClick={() => {
                          setActiveDetails(prev => !prev);
                          setActiveInformation(false);
                          setActiveReviews(false);
                        }}
                      >
                        Detail
                      </button>
                    </li>
                    <li className="nav-item relative leading-[28px]">
                      <button
                        className={`nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block ${activeInformation && 'active text-[#6c7fd8]'}`}
                        data-tab="information"
                        onClick={() => {
                          setActiveInformation(prev => !prev);
                          setActiveDetails(false);
                          setActiveReviews(false);
                        }}
                      >
                        Information
                      </button>
                    </li>
                    <li className="nav-item relative leading-[28px]">
                      <button
                        className={`nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block ${activeReviews && 'active text-[#6c7fd8]'}`}
                        data-tab="reviews"
                        onClick={() => {
                          setActiveReviews(prev => !prev);
                          setActiveDetails(false);
                          setActiveInformation(false);
                        }}
                      >
                        Reviews
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  {
                    activeDetails && (
                      <div className="tab-pro-pane" id="detail">
                        <div className="bb-inner-tabs border-[1px] border-solid border-[#eee] p-[15px] rounded-[20px]">
                          <div className="bb-details">
                            <div
                              dangerouslySetInnerHTML={{ __html: product?.description }}
                              className="mb-[12px] font-Poppins text-[#686e7d] leading-[28px] tracking-[0.03rem] font-light"
                            />
                            <div className="details-info">
                              <ul className="list-disc pl-[20px] mb-[0]">
                                <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                  Warranty : {product?.warrantyInformation?.durationMonths} Months ({product?.warrantyInformation?.warrantyType.toUpperCase()}) <span title={product?.warrantyInformation?.claimProcess} className="text-blue-600">how?</span>
                                </li>
                                <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                  Shipping : {product?.shippingInformation?.shippingTime} ({product?.shippingInformation?.shippingMethod})
                                </li>
                                {
                                  product?.offers.length > 0 && (
                                    <li className="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light">
                                      Offers: {product?.offers.map((offer, index) => (
                                        <span key={index} className="font-Poppins text-[#777] text-[14px] leading-[28px] tracking-[0.03rem]">
                                          {offer.offerTitle} - {offer.offerDescription}
                                        </span>
                                      ))}
                                    </li>
                                  )
                                }

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
                                    Return
                                  </span>
                                  {product?.returnPolicy?.returnPeriod || 'No Returns Allowed'}

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
                    )
                  }
                  {
                    activeInformation && (
                      <div className="tab-pro-pane" id="information">
                        <div className="bb-inner-tabs border-[1px] border-solid border-[#eee] p-[15px] rounded-[20px]">
                          <div className="information">
                            <ul className="list-disc pl-[20px]">
                              <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                                <span className="inline-flex min-w-[130px] font-medium">
                                  Weight
                                </span>{" "}
                                {product?.weight}g
                              </li>
                              <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                                <span className="inline-flex min-w-[130px] font-medium">
                                  Dimensions
                                </span>{" "}
                                {product?.dimensions}
                              </li>
                              <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                                <span className="inline-flex min-w-[130px] font-medium">
                                  Color
                                </span>{" "}
                                {product?.colors || 'White'}
                              </li>
                              <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                                <span className="inline-flex min-w-[130px] font-medium">
                                  Brand
                                </span>{" "}
                                {product?.brand}
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
                                {product?.minimumOrderQuantity || 1}
                              </li>
                              <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                                <span className="inline-flex min-w-[130px] font-medium">
                                  Type
                                </span>
                                {product?.category?.name}
                              </li>
                              <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                                <span className="inline-flex min-w-[130px] font-medium">
                                  Shelf Life
                                </span>
                                {'Life Time'}
                              </li>
                              <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                                <span className="inline-flex min-w-[130px] font-medium">
                                  Ingredients
                                </span>
                                {product?.inBox || 'No Ingredients'}
                              </li>
                              <li className="font-Poppins text-[15px] font-light tracking-[0.03rem] leading-[28px] text-[#686e7d] py-[5px]">
                                <span className="inline-flex min-w-[130px] font-medium">
                                  Instructions
                                </span>
                                Keep it away from water. Wipe clean with a soft cloth.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {
                    activeReviews && (
                      <div className="tab-pro-pane" id="reviews">
                        <div className="bb-inner-tabs border-[1px] border-solid border-[#eee] p-[15px] rounded-[20px]">
                          <div className="bb-reviews">

                            {
                              product?.reviews?.length > 0 ? (

                                product?.reviews.map((review, index) => (
                                  <div key={index} className="reviews-bb-box flex mb-[24px] max-[575px]:flex-col">
                                    <div className="inner-image mr-[12px] max-[575px]:mr-[0] max-[575px]:mb-[12px]">
                                      <img
                                        src="/img/dummy-image.jpg"
                                        alt="img-1"
                                        className="w-[50px] h-[50px] max-w-[50px] rounded-[10px]"
                                      />
                                    </div>
                                    <div className="inner-contact">
                                      <h4 className="font-quicksand leading-[1.2] tracking-[0.03rem] mb-[5px] text-[16px] font-bold text-[#3d4750]">
                                        {review.reviewerName || "Anonymous"}
                                      </h4>
                                      <div className="bb-pro-rating flex">
                                        {Array(5)
                                          .fill(0)
                                          .map((_, starIndex) => (
                                            <i
                                              key={starIndex}
                                              className={`${starIndex < review.rating
                                                ? "ri-star-fill text-[#fea99a]"
                                                : "ri-star-line text-[#777]"
                                                } float-left text-[15px] mr-[3px]`}
                                            />
                                          ))}
                                      </div>
                                      <p className="font-Poppins text-[14px] leading-[26px] font-light tracking-[0.03rem] text-[#686e7d]">
                                        {review.comment}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="reviews-bb-box flex mb-[24px] max-[575px]:flex-col">
                                  <div className="inner-image mr-[12px] max-[575px]:mr-[0] max-[575px]:mb-[12px]">
                                    <img
                                      src="/img/dummy-image.jpg"
                                      alt="img-1"
                                      className="w-[50px] h-[50px] max-w-[50px] rounded-[10px]"
                                    />
                                  </div>
                                  <div className="inner-contact">
                                    <h4 className="font-quicksand leading-[1.2] tracking-[0.03rem] mb-[5px] text-[16px] font-bold text-[#3d4750]">
                                      Manish
                                    </h4>
                                    <div className="bb-pro-rating flex">
                                      <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                                      <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                                      <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                                      <i className="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]" />
                                      <i className="ri-star-line float-left text-[15px] mr-[3px] text-[#777]" />
                                    </div>
                                    <p className="font-Poppins text-[14px] leading-[26px] font-light tracking-[0.03rem] text-[#686e7d]">
                                      The lamp exceeded my expectations. Bright, stylish, and personalized just how I wanted. Highly recommend!
                                    </p>
                                  </div>
                                </div>
                              )
                            }

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
                                <textarea
                                  name="your-comment"
                                  placeholder="Enter Your Comment"
                                  className="w-full h-[100px] border-[1px] border-solid border-[#eee] py-[20px] pl-[20px] pr-[10px] outline-[0] text-[14px] font-normal text-[#777] rounded-[20px] p-[10px]"
                                  defaultValue={""}
                                />
                              </div>
                              <div className="input-button">
                                <a

                                  className="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] inline-flex font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[15px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                                >
                                  Submit
                                </a>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )
                  }

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
                  <ProductSlider products={relatedProduct} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isCartOpen && <CartSidebar onClose={toggelCartSidebarClose} />}

    </>
  );
};

export default ProductDetails;