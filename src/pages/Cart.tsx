"use client";
import React, { useEffect, useState } from "react";
// import ProductSlider from "@/components/ProductSlider";
import Breadcrumb from "@/components/Breadcrumb";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/helpers/helpers";
import Link from "next/link";

const Cart = () => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState({ totalPrice: 0, discountPrice: 0, shippingTotal: 0 });
  const { updateQuantity, removeFromCart, getTotalPrice } = useCartStore();

  const items = useCartStore((state) => state.items);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
    toast.info('Updated quantity');
  };


  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [items, getTotalPrice]);



  const gotoCheckout = () => {
    return router.push('/checkout');

  }



  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Cart"} />
      {/* Cart */}
      <section className="section-cart py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">


            <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
              <div
                className="bb-cart-table border-[1px] border-solid border-[#eee] rounded-[20px] overflow-auto max-[1399px]:overflow-y-auto"
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
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-3 px-4 text-center">Your cart is empty</td>
                      </tr>
                    ) : (
                      items.map(item => (
                        <tr className="border-b-[1px] border-solid border-[#eee]" key={item._id}>
                          <td className="p-[12px]">
                            <Link  href={`/product-details/${item.slug}`}>
                              <div className="Product-cart flex items-center">
                                <Image
                                  className="w-[70px] border-[1px] border-solid border-[#eee] rounded-[10px]"
                                  src={item.thumbnail.url}
                                  alt={item.title}
                                  width={100} height={100}
                                />
                                <span className="ml-[10px] font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">
                                  {item.title}
                                </span>
                              </div>
                            </Link>
                          </td>
                          <td className="p-[12px]">
                            <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                              {item?.price &&
                                item?.discountType &&
                                item?.discountPrice
                                ? item.discountType === 'percentage'
                                  ? formatCurrency(
                                    item.price -
                                    (item.price * item.discountPrice) / 100
                                  )
                                  : formatCurrency(item.price - item.discountPrice)
                                : "0"
                              }
                            </span>
                          </td>
                          <td className="p-[12px]">
                            <div className="qty-plus-minus w-[85px] h-[45px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]">
                              <div className="dec bb-qtybtn" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</div>
                              <input
                                className="qty-input text-[#777] float-left text-[14px] h-[auto] m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                                type="text"
                                name="bb-qtybtn"
                                min="1"
                                readOnly
                                value={item.quantity}
                              />
                              <div className="inc bb-qtybtn" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</div>
                            </div>
                          </td>
                          <td className="p-[12px]">
                            <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">
                              {
                                formatCurrency((item.discountType === 'percentage' ? (
                                  item.price - (item.price * item.discountPrice) / 100
                                ) : item.price - item.discountPrice) * item.quantity)
                              }
                            </span>
                          </td>
                          <td className="p-[12px]">
                            <div className="pro-remove">
                              <button onClick={() => removeFromCart(item._id)}>
                                <i className="ri-delete-bin-line transition-all duration-[0.3s] ease-in-out text-[20px] text-[#ff0000] hover:text-[#771616]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                      ))}


                  </tbody>
                </table>
              </div>

            </div>


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
                  <div className="bb-cart-summary">
                    <div className="inner-summary">
                      <ul>
                        <li className="mb-[12px] flex justify-between leading-[28px]">
                          <span className="text-left font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-medium">
                            Sub-Total
                          </span>
                          <span className="text-right font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-semibold">
                            <span className="text-[15px] line-through">{totalPrice.totalPrice.toFixed(2)}</span> ₹{totalPrice.discountPrice.toFixed(2)}

                          </span>
                        </li>
                        <li className="mb-[12px] flex justify-between leading-[28px]">
                          <span className="text-left font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-medium">
                            Delivery Charges
                          </span>
                          <span className="text-right font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-semibold">
                            Free
                          </span>
                        </li>
                        <li className="mb-[12px] flex justify-between leading-[28px]">
                          <span className="text-left font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-medium">
                            Discount
                          </span>
                          <span className="text-right font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-semibold">
                            <a className="bb-coupon drop-coupon font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#ff0000] cursor-pointer">
                              0
                            </a>
                          </span>
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
                            <span className="text-[15px] line-through">{(totalPrice.totalPrice + totalPrice.shippingTotal).toFixed(2)}</span> ₹{(totalPrice.discountPrice + totalPrice.shippingTotal).toFixed(2)}

                          </span>
                        </li>
                      </ul>
                    </div>

                    <button
                      className="w-full bb-btn-2 mt-[24px] inline-flex items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[8px] px-[20px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                      data-aos="fade-up"
                      data-aos-duration={1000}
                      data-aos-delay={400}
                      onClick={gotoCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
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
                  {/* <ProductSlider /> */}
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
