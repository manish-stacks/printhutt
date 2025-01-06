"use client";
import { create_a_new_order, initiate_Payment } from "@/_services/common/order";
import Breadcrumb from "@/components/Breadcrumb";
import { CheckoutAddressForm } from "@/components/checkout/address-form";
import { CheckoutloginForm } from "@/components/checkout/login-form";
import PaymentMethod from "@/components/checkout/payment-method";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'offline'>('online');
  const [selectAddress, setSelectAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [items, getTotalPrice]);


  const handleChangeAddress = (id: string) => {
    setSelectAddress(id);
  };


  const placeOrder = async () => {
    const order = {
      items: items.map((item) => ({ productId: item._id, slug: item.slug, quantity: item.quantity, name: item.title, price: item.price })),
      getTotalItems: getTotalItems(),
      totalPrice: getTotalPrice(),
      paymentMethod: paymentMethod,
      address: selectAddress
    };

    try {
      setIsSubmitting(true);
      const response: { order: { _id: string } } = await create_a_new_order(order);
      const paymentResponse = await initiate_Payment(response.order);
      if (paymentResponse) {
        const redirectUrl = paymentResponse?.instrumentResponse?.redirectInfo?.url;
        window.location.href = redirectUrl;
      } else {
        toast.error("Payment initiation failed!");
      }
      return;
    } catch (error) {
      console.error(error);
      toast.error('Somthing Went Wrong');
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <>
      {/* Breadcrumb */}

      <Breadcrumb title={"Checkout"} />

      {/* checkout */}
      <section className="section-checkout py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            {
              isLoggedIn ? (
                <CheckoutAddressForm onChangeAddress={handleChangeAddress} />
              ) : (
                <CheckoutloginForm />
              )
            }


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
                          {/* ₹{totalPrice.toFixed(2)} */}Free
                        </span>
                      </li>
                      <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          Coupon Discount
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          <a

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
                  <PaymentMethod
                    value={paymentMethod}
                    onChange={(value) => setPaymentMethod(value)}
                    totalPrice={totalPrice}
                  />
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
                  <div className="payment-img">
                    <img
                      src="/img/payment/payment.png"
                      alt="payment"
                      className="w-full"
                    />
                  </div>
                </div>


                <button
                  className="w-full bb-btn-2 mt-[24px] inline-flex items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[8px] px-[20px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={400}
                  onClick={placeOrder}
                >
                  {isSubmitting ? 'Submiting...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
