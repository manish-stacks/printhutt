"use client";
import { getAllCouponsPagination } from "@/_services/admin/coupon";
import { create_a_new_order, initiate_Payment } from "@/_services/common/order";
import Breadcrumb from "@/components/Breadcrumb";
import { CheckoutAddressForm } from "@/components/checkout/address-form";
import { CheckoutloginForm } from "@/components/checkout/login-form";
import PaymentMethod from "@/components/checkout/payment-method";
import Coupons_Slider from "@/components/Coupons_Slider";
import CouponSuccessModal from "@/components/CouponSuccessModal";
import MailModal from "@/components/MailModal";
import { formatCurrency } from "@/helpers/helpers";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState({ totalPrice: 0, discountPrice: 0, shippingTotal: 0, coupon_discount: 0 });
  const { items, getTotalPrice, getTotalItems } = useCartStore();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'offline'>('online');
  const [selectAddress, setSelectAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupon_mark, setCoupon_mark] = useState('');
  const [coupons_slider, SetCoupons_slider] = useState(false);
  const [applied, setApplied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState(0);
  const [showMailModal, setShowMailModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const price = getTotalPrice();
    setTotalPrice(price);
    setOriginalPrice(price.discountPrice);
  }, [items, getTotalPrice]);

 /*
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
      (window as any).dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: "INR",
          value: (totalPrice.discountPrice + totalPrice.shippingTotal).toFixed(2),
          items: items.map((item, index) => ({
            item_id: item.sku,
            item_name: item.title,
            item_brand: item?.brand,
            // coupon: selectedCoupon?.code || "",
            discount: item.discountPrice,
            index: index,
            price: Number(
              (
                item.discountType === "percentage"
                  ? item.price - (item.price * item.discountPrice) / 100
                  : item.price - item.discountPrice
              ) * item.quantity
            ).toFixed(2),
            quantity: item.quantity
          })),
        },
      });
    }
  }, [items, totalPrice, selectedCoupon]);
*/
  const handle_select = (coupon) => {
    if (selectedCoupon?.code === coupon.code) {
      setErrorMsg('This coupon has already been applied');
      return;
    }

    if (originalPrice < coupon.minimumPurchaseAmount) {
      setErrorMsg(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
      return;
    }

    applyCouponDiscount(coupon);
  };

  const handleMarkChange = (e) => {
    const { value } = e.target;
    setCoupon_mark(value);
    setErrorMsg('');
  };

  const setPaymentFunction = (value: string) => {
    setPaymentMethod(value);
    if (value === 'offline') {
      setTotalPrice(prev => ({
        ...prev,
        coupon_discount: 0
      }));
      setErrorMsg('COD Not Applied for Coupons');
      return;
    }
    else {
      window.location.reload();
    }
    console.log(value)
  }
  const applyCouponDiscount = (coupon) => {
    let discount = 0;

    if (originalPrice >= coupon.minimumPurchaseAmount) {
      if (coupon.discountType === "percentage") {
        discount = (coupon.discountValue / 100) * originalPrice;
        if (discount > coupon.maxDiscountAmount) {
          discount = coupon.maxDiscountAmount;
        }
      } else if (coupon.discountType === "fixed") {
        discount = coupon.discountValue;
      }

      const finalDiscountPrice = originalPrice - discount;
      setTotalPrice(prev => ({
        ...prev,
        discountPrice: finalDiscountPrice,
        coupon_discount: discount
      }));

      setSelectedCoupon(coupon);
      setCoupon_mark(coupon?.code);
      setApplied(true);
    } else {
      setErrorMsg(`Minimum purchase amount of ${formatCurrency(coupon.minimumPurchaseAmount)} required`);
    }
  };

  const handleCloseCoupon = () => {
    SetCoupons_slider(false);
  };

  const handleChangeAddress = (id: string) => {
    setSelectAddress(id);
  };

  const handle_apply_code = async () => {
    if (!coupon_mark.trim()) {
      setErrorMsg('Please enter a coupon code');
      return;
    }

    if (selectedCoupon?.code === coupon_mark) {
      setErrorMsg('This coupon has already been applied');
      return;
    }

    try {
      const page = 1;
      const query = "";
      const data = await getAllCouponsPagination(page, query);
      const coupon = data.coupons.find((c) => c.code === coupon_mark);

      if (coupon) {
        handle_select(coupon);
        setErrorMsg(''); // Clear the error message
        toast.success('Coupon applied successfully');
      } else {
        setErrorMsg('The coupon code is either invalid or has expired. Please try another one.');
      }
    } catch (error) {
      setErrorMsg('The coupon code is either invalid or has expired. Please try another one.');
      // console.error(error);
    }
  };

  const placeOrder = async () => {

    if (!isLoggedIn) return router.push('/login');
    const getPrice = await getTotalPrice();


    const order = {
      items: items.map((item) => ({
        productId: item._id,
        name: item.title,
        slug: item.slug,
        quantity: item.quantity,
        sku: item.sku,
        product_image: item.thumbnail.url,
        custom_data: item.custom_data || null,
        price: item.price,
        discountType: item.discountType,
        discountPrice: item.discountPrice
      })),
      getTotalItems: getTotalItems(),
      totalPrice: {
        discountPrice: getPrice.discountPrice,
        shippingTotal: getPrice.shippingTotal,
        totalPrice: getPrice.totalPrice,
        coupon_discount: Math.floor(totalPrice?.coupon_discount?.toFixed(2) || 0)
      },
      coupon: {
        code: selectedCoupon?.code || '',
        discountAmount: selectedCoupon?.discountValue || 0,
        discountType: selectedCoupon?.discountType || "",
        isApplied: selectedCoupon?.isActive || false,
      },
      paymentMethod: paymentMethod,
      address: selectAddress,
      payAmt: totalPrice.discountPrice
    };

    console.log(order)
    try {
      setIsSubmitting(true);
      const response: { order: { _id: string } } = await create_a_new_order(order);
      console.log(response)
      if (response.success) {
        await paymentintInitiation(response.order);
      } else {
        if (response.message == "Email address is required.") {
          setShowMailModal(true);
        }
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something Went Wrong');
    } finally {
      setIsSubmitting(false);
    }
  };


  const paymentintInitiation = async (order) => {
    try {
      const paymentResponse = await initiate_Payment(order);
      if (paymentResponse) {
        const redirectUrl = paymentResponse?.instrumentResponse?.redirectInfo?.url;
        return window.location.href = redirectUrl;
      } else {
        toast.error("Payment initiation failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something Went Wrong');
    }
  }


  return (
    <>
      <Breadcrumb title={"Checkout"} />
      <section className="section-checkout py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">

            <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]" >
              <div
                className="bb-checkout-contact border-[1px] border-solid border-[#eee] p-[20px] bg-[#f1f3f6]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={400}
                style={{ position: 'sticky', top: '20px' }}
              >

                {isLoggedIn ? (
                  <CheckoutAddressForm onChangeAddress={handleChangeAddress} />
                ) : (
                  <CheckoutloginForm />
                )}

                <div className="bb-checkout-pro mt-4">
                  {items.length === 0 ? (
                    <div>Your cart is empty</div>
                  ) : (
                    items.map(item => (
                      <div key={item._id} className="pro-items p-[15px] bg-[#ffffff] border-[1px] border-solid border-[#eee] rounded-[20px] flex mb-[24px] max-[420px]:flex-col">
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
                            <Link href={`/product-details/${item.slug}`} className="font-Poppins tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]">
                              {item.title}
                            </Link>
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
                              {`${formatCurrency(item?.price)} x ${item.quantity}`}
                              <span className="text-sm px-2 rounded-lg ml-2 bg-amber-400 text-slate-900">
                                {
                                  item.discountPrice && item.discountType === 'percentage' ? (
                                    item.discountPrice + '%'
                                  ) : (
                                    formatCurrency(item.discountPrice)
                                  )
                                }
                              </span>
                            </span>
                          </div>
                          <div className="bb-pro-variation">
                            <ul className="flex flex-wrap m-[-2px]">
                              <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal active">
                                <span className="text-[15px] line-through mr-1">{`${item?.price * item?.quantity}`}</span>
                                <span
                                  className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#ff] tracking-[0.03rem]"
                                  data-tooltip="Small"
                                >
                                  {formatCurrency((item.discountType === 'percentage' ? (
                                    item.price - (item.price * item.discountPrice) / 100
                                  ) : item.price - item.discountPrice) * item.quantity)}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )))}
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
                          {formatCurrency(totalPrice.totalPrice)}
                        </span>
                      </li>
                      <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          Delivery Charges
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          {totalPrice.shippingTotal > 0 ? formatCurrency(totalPrice.shippingTotal) : 'Free'}
                        </span>
                      </li>
                      {selectedCoupon && (
                        <li className="flex justify-between leading-[28px] mb-[8px]">
                          <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                            Applied Coupon <span className="text-[12px] bg-rose-500 text-rose-100 py-[2px] px-[4px] rounded">{selectedCoupon?.code}</span>
                          </span>
                          <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                            <a className="apply drop-coupon font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#49941e]">
                              -{formatCurrency(totalPrice?.coupon_discount)}
                            </a>
                          </span>
                        </li>
                      )}

                      <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          Extra Discount :
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#49941e]">
                          -{formatCurrency((totalPrice?.totalPrice || 0) - (totalPrice?.discountPrice || 0) - (totalPrice?.coupon_discount || 0))}
                        </span>

                      </li>

                      <li className="flex justify-between leading-[28px] mb-[8px]">
                        <span className="left-item font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          Total :
                        </span>
                        <span className="font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#686e7d]">
                          {formatCurrency(totalPrice.discountPrice + totalPrice.shippingTotal)}
                        </span>
                      </li>

                      <li className="flex justify-between leading-[28px] mt-6">
                        <div className="coupon-down-box w-full">
                          <form className="relative">
                            <input
                              className="bb-coupon w-full capitalize p-[10px] text-[14px] font-normal text-[#686e7d] border-[0.5px] border-solid border-[#999] outline-[0] rounded-[10px]"
                              type="text"
                              placeholder="Enter Your coupon Code"
                              name="coupon_mark"
                              onChange={handleMarkChange}
                              value={coupon_mark}
                            />
                            <button
                              className={`bb-btn-2 transition-all duration-[0.3s] ease-in-out my-[8px] mr-[8px] flex justify-center items-center absolute right-[0] top-[0] bottom-[0] font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[12px] text-[13px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750] ${selectedCoupon ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer'}`}
                              type="button"
                              disabled={selectedCoupon !== null}
                              onClick={handle_apply_code}
                            >
                              {selectedCoupon ? 'Applied' : 'Apply'}
                            </button>
                          </form>
                          {errorMsg && (
                            <p className="text-red-600 font-semibold bg-red-100 p-4 rounded-md mt-4">
                              {errorMsg}
                            </p>
                          )}
                        </div>
                      </li>
                      <li onClick={() => SetCoupons_slider(true)} className="underline px-2 py-1 text-violet-500 cursor-pointer text-base">
                        <p>Available Coupons</p>
                      </li>
                    </ul>
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
                    // onChange={(value) => setPaymentMethod(value)}
                    onChange={(value) => setPaymentFunction(value)}
                    totalPrice={totalPrice.discountPrice}
                  />
                </div>
                <button
                  className="w-full bb-btn-2  inline-flex items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[8px] px-[20px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={400}
                  onClick={placeOrder}
                >
                  {isSubmitting ? 'Submitting...' : `Place Order - ${paymentMethod == 'offline' ? formatCurrency(totalPrice?.discountPrice * 0.2) : formatCurrency(totalPrice?.discountPrice)}`}
                </button>

                <div
                  className="mt-5 checkout-items border-[1px] border-solid border-[#eee] p-[20px] rounded-[20px] mb-[24px]"
                  data-aos="fade-up"
                  data-aos-duration={1000}
                  data-aos-delay={200}
                >
                  <div className="sub-title mb-[12px]">
                    <h4 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">
                      Accepted Payment
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
        {coupons_slider && (
          <Coupons_Slider isOpen={coupons_slider} total_money={totalPrice} handle_select={handle_select} onClose={handleCloseCoupon} selectCoupon={selectedCoupon} />
        )}
        {applied && (
          <CouponSuccessModal isOpen={applied} onClose={() => setApplied(false)} coupon={coupon_mark} discountAmount={totalPrice?.coupon_discount} />
        )}

        {
          showMailModal && (
            <MailModal isOpen={showMailModal} onClose={() => setShowMailModal(false)} />
          )
        }
      </section>
    </>
  );
};

export default Checkout;