import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import BackToTop from "./BackToTop";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      {/* footer */}
      <footer className="bb-footer mt-[50px] max-[1199px]:mt-[35px] bg-[#f8f8fb] text-[#fff]">
        <div className="footer-container border-t-[1px] border-solid border-[#eee]">
          <div className="footer-top py-[50px] max-[1199px]:py-[35px]">
            <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
              <div
                className="flex flex-wrap w-full max-[991px]:mb-[-30px]"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="min-[992px]:w-[25%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-cat">
                  <div className="bb-footer-widget bb-footer-company flex flex-col max-[991px]:mb-[24px]">
                    <Image
                      src="/print-hutt-logo.webp"
                      className="bb-footer-logo max-w-[180px] mb-[30px] max-[767px]:max-w-[130px]"
                      alt="footer logo"
                      width={180}
                      height={56}
                      priority={true}
                    />
                    <Image
                      src="/print-hutt-logo.webp"
                      className="bb-footer-dark-logo max-w-[180px] mb-[30px] max-[767px]:max-w-[130px] hidden"
                      alt="footer logo"
                      width={180}
                      height={56}
                      priority={true}
                    />
                    <p className="bb-footer-detail max-w-[400px] mb-[30px] p-[0] font-Poppins text-[14px] leading-[27px] font-normal text-[#686e7d] inline-block relative max-[1399px]:text-[15px] max-[1199px]:text-[14px]">
                      BlueBerry is the biggest market of grocery products. Get
                      your daily needs from our store.
                    </p>
                  </div>
                </div>
                <div className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-info">
                  <div className="bb-footer-widget">
                    <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                      Category
                      <div className="bb-heading-res">
                        <i className="ri-arrow-down-s-line"></i>
                      </div>
                    </h4>
                    <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                      <ul className="align-items-center">
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-left-sidebar-col-3.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Dairy &amp; Milk
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-banner-left-sidebar-col-3.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Snack &amp; Spice
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-full-width-col-5.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Fast Food
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-list-left-sidebar.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Juice &amp; Drinks
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-list-full-col-2.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Bakery
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center">
                          <a
                            href="shop-banner-right-sidebar-col-4.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Seafood
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-account">
                  <div className="bb-footer-widget">
                    <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                      Company
                      <div className="bb-heading-res">
                        <i className="ri-arrow-down-s-line"></i>
                      </div>
                    </h4>
                    <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                      <ul className="align-items-center">
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="about-us.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            About us
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="track-order.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Delivery
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="faq.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Legal Notice
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="terms.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Terms &amp; conditions
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="checkout.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Secure payment
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center">
                          <a
                            href="contact-us.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Contact us
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-service">
                  <div className="bb-footer-widget">
                    <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                      Account
                      <div className="bb-heading-res">
                        <i className="ri-arrow-down-s-line"></i>
                      </div>
                    </h4>
                    <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                      <ul className="align-items-center">
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="login.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Sign In
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="cart.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            View Cart
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="faq.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Return Policy
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="shop-left-sidebar-col-3.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Become a Vendor
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            href="product-left-sidebar.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Affiliate Program
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center">
                          <a
                            href="checkout.html"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Payments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[25%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-cont-social">
                  <div className="bb-footer-contact mb-[30px]">
                    <div className="bb-footer-widget">
                      <h4 className="bb-footer-heading font-quicksand leading-[1.2] text-[18px] font-bold mb-[20px] text-[#3d4750] tracking-[0] relative block w-full pb-[15px] capitalize border-b-[1px] border-solid border-[#eee] max-[991px]:text-[14px]">
                        Contact
                        <div className="bb-heading-res">
                          <i className="ri-arrow-down-s-line"></i>
                        </div>
                      </h4>
                      <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                        <ul className="align-items-center">
                          <li className="bb-footer-link bb-foo-location flex items-start max-[991px]:mb-[15px] mb-[16px]">
                            <span className="mt-[5px] w-[25px] basis-[auto] grow-[0] shrink-[0]">
                              <i className="ri-map-pin-line leading-[0] text-[18px] text-[#6c7fd8]" />
                            </span>
                            <p className="m-[0] font-Poppins text-[14px] text-[#686e7d] font-normal leading-[28px] tracking-[0.03rem]">
                              971 Lajamni, Motavarachha, Surat, Gujarat, Bharat
                              394101.
                            </p>
                          </li>
                          <li className="bb-footer-link bb-foo-call flex items-start max-[991px]:mb-[15px] mb-[16px]">
                            <span className="w-[25px] basis-[auto] grow-[0] shrink-[0]">
                              <i className="ri-whatsapp-line leading-[0] text-[18px] text-[#6c7fd8]" />
                            </span>
                            <a
                              href="tel:+009876543210"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] inline-block relative break-all tracking-[0] font-normal max-[1399px]:text-[15px] max-[1199px]:text-[14px]"
                            >
                              +00 9876543210
                            </a>
                          </li>
                          <li className="bb-footer-link bb-foo-mail flex">
                            <span className="w-[25px] basis-[auto] grow-[0] shrink-[0]">
                              <i className="ri-mail-line leading-[0] text-[18px] text-[#6c7fd8]" />
                            </span>
                            <a
                              href="mailto:example@email.com"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] inline-block relative break-all tracking-[0] font-normal max-[1399px]:text-[15px] max-[1199px]:text-[14px]"
                            >
                              example@email.com
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bb-footer-social">
                    <div className="bb-footer-widget">
                      <div className="bb-footer-links bb-footer-dropdown hidden max-[991px]:mb-[35px]">
                        <ul className="align-items-center flex flex-wrap items-center">
                          <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                            <a
                              
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <FaFacebookF className="text-[16px] text-[#fff]" />
                            </a>
                          </li>
                          <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                            <a
                              
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <FaTwitter className="text-[16px] text-[#fff]" />
                            </a>
                          </li>
                          <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                            <a
                              
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <FaLinkedinIn className="text-[16px] text-[#fff]" />
                            </a>
                          </li>
                          <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                            <a
                              
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <FaInstagram className="text-[16px] text-[#fff]" />
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
          <div className="footer-bottom py-[10px] border-t-[1px] border-solid border-[#eee] max-[991px]:py-[15px]">
            <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
              <div className="flex flex-wrap w-full">
                <div className="bb-bottom-info w-full flex flex-row items-center justify-between max-[991px]:flex-col px-[12px]">
                  <div className="footer-copy max-[991px]:mb-[15px]">
                    <div className="footer-bottom-copy max-[991px]:text-center">
                      <div className="bb-copy text-[#686e7d] text-[13px] tracking-[1px] text-center font-normal leading-[2]">
                        Copyright ©{" "}
                        <span
                          className="text-[#686e7d] text-[13px] tracking-[1px] text-center font-normal"
                          id="copyright_year"
                        />
                        {currentYear}
                        <Link
                          className="site-name transition-all duration-[0.3s] ease-in-out font-medium text-[#6c7fd8] hover:text-[#3d4750] font-Poppins text-[15px] leading-[28px] tracking-[0.03rem]"
                          href="/"
                        >
                          {""} HBS  {" "}
                        </Link>
                        all rights reserved.
                      </div>
                    </div>
                  </div>
                  <div className="footer-bottom-right">
                    <div className="footer-bottom-payment flex justify-center">
                      <div className="payment-link">
                        <img
                          src="/img/payment/payment.png"
                          alt="payment"
                          className="max-[360px]:w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Quick view Modal */}
      <div className="bb-modal quickview-modal max-[575px]:w-full fixed top-[45%] max-[767px]:top-[50%] left-[50%] z-[30] max-[767px]:w-full hidden max-[767px]:max-h-full max-[767px]:overflow-y-auto ">
        <div className="bb-modal-overlay w-full h-screen hidden fixed top-0 left-0 z-[26] bg-[#000000b3]" />
        <div className="bb-modal-dialog h-full my-[0%] mx-auto max-w-[700px] w-[700px] max-[991px]:max-w-[650px] max-[991px]:w-[650px] max-[767px]:w-[80%] max-[767px]:h-auto max-[767px]:max-w-[80%] max-[767px]:m-[0] max-[767px]:py-[35px] max-[767px]:mx-auto max-[575px]:w-[90%] transition-transform duration-[0.3s] ease-out cr-fadeOutUp">
          <div className="modal-content p-[24px] relative bg-[#fff] rounded-[20px] overflow-hidden">
            <button
              type="button"
              className="bb-close-modal transition-all duration-[0.3s] ease-in-out w-[16px] h-[20px] absolute top-[-5px] right-[27px] bg-[#e04e4eb3] rounded-[10px] cursor-pointer hover:bg-[#e04e4e]"
              title="Close"
            />
            <div className="modal-body mx-[-12px] max-[767px]:mx-[0]">
              <div className="flex flex-wrap mx-[-12px] mb-[-24px]">
                <div className="min-[768px]:w-[41.66%] min-[576px]:w-full px-[12px] mb-[24px]">
                  <div className="single-pro-img single-pro-img-no-sidebar h-full border-[1px] border-solid border-[#eee] overflow-hidden rounded-[20px]">
                    <div className="single-product-scroll h-full">
                      <div className="single-slide zoom-image-hover h-full bg-[#fff] flex items-center">
                        <img
                          className="img-responsive max-w-full block"
                          src="https://printhutt.com/media/custom-name-lemp.png"
                          alt="product-img-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="min-[768px]:w-[58.33%] min-[576px]:w-full px-[12px] mb-[24px]">
                  <div className="quickview-pro-content">
                    <h5 className="bb-quick-title">
                      <a
                        href="product-left-sidebar.html"
                        className="font-Poppins tracking-[0.03rem] mb-[10px] block text-[#3d4750] text-[20px] leading-[30px] font-medium"
                      >
                        Mix nuts premium quality organic dried fruit 250g pack
                      </a>
                    </h5>
                    <div className="bb-pro-rating flex mb-[10px]">
                      <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                      <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                      <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                      <i className="ri-star-fill float-left text-[15px] mr-[3px] leading-[18px] text-[#fea99a]" />
                      <i className="ri-star-line float-left text-[15px] mr-[3px] leading-[18px] text-[#777]" />
                    </div>
                    <div className="bb-quickview-desc mb-[10px] text-[15px] leading-[24px] text-[#777] font-light">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1900s,
                    </div>
                    <div className="bb-quickview-price pt-[5px] pb-[10px] flex items-center justify-left">
                      <span className="new-price px-[3px] text-[16px] text-[#686e7d] font-bold">
                        $50.00
                      </span>
                      <span className="old-price px-[3px] text-[14px] text-[#686e7d] line-through">
                        $62.00
                      </span>
                    </div>
                    <div className="bb-pro-variation mt-[15px] mb-[25px]">
                      <ul className="flex flex-wrap m-[-2px]">
                        <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal active">
                          <a
                            
                            className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                            data-tooltip="Small"
                          >
                            250g
                          </a>
                        </li>
                        <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal">
                          <a
                            
                            className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                            data-tooltip="Medium"
                          >
                            500g
                          </a>
                        </li>
                        <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal">
                          <a
                            
                            className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                            data-tooltip="Large"
                          >
                            1kg
                          </a>
                        </li>
                        <li className="h-[22px] m-[2px] py-[2px] px-[8px] cursor-pointer border-[1px] border-solid border-[#eee] text-[#777] flex items-center justify-center text-[12px] leading-[22px] rounded-[20px] font-normal">
                          <a
                            
                            className="bb-opt-sz font-Poppins text-[12px] leading-[22px] font-normal text-[#777] tracking-[0.03rem]"
                            data-tooltip="Extra Large"
                          >
                            2kg
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="bb-quickview-qty flex max-[360px]:justify-center">
                      <div className="qty-plus-minus w-[85px] h-[40px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px] max-[360px]:m-[auto]">
                        <input
                          className="qty-input text-[#777] float-left text-[14px] h-auto m-[0] p-[0] text-center w-[32px] outline-[0] font-normal leading-[35px] rounded-[10px]"
                          type="text"
                          name="bb-qtybtn"
                          defaultValue={1}
                        />
                      </div>
                      <div className="bb-quickview-cart ml-[4px] max-[360px]:mt-[15px] max-[360px]:ml-[0] max-[360px]:flex max-[360px]:justify-center">
                        <button
                          type="button"
                          className="bb-btn-1 transition-all duration-[0.3s] ease-in-out font-Poppins h-[40px] leading-[28px] tracking-[0.03rem] py-[3px] px-[20px] text-[14px] font-normal text-[#3d4750] bg-transparent rounded-[10px] border-[1px] border-solid border-[#3d4750] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-[#fff]"
                        >
                          <i className="ri-shopping-bag-line pr-[8px]" />
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile footer menu */}
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600 block lg:hidden md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button
            data-tooltip-target="tooltip-home"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="sr-only">Home</span>
          </button>
          <div
            id="tooltip-home"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Home
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>
          <button
            data-tooltip-target="tooltip-wallet"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M128,70.8C97.4,0.2,10.6,16.7,10,98.5C9.7,145.8,124.7,218,128.1,229.7C131.3,217.5,246.3,145,246,98C245.4,16,157.1,3,128,70.8z" />
            </svg>

            <span className="sr-only">Wallet</span>
          </button>
          <div
            id="tooltip-wallet"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Wallet
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>
          <div className="flex items-center justify-center">
            <button
              data-tooltip-target="tooltip-new"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5 mb-1 text-slate-100 dark:text-gray-400 group-hover:text-slate-100 dark:group-hover:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              <span className="sr-only">Home</span>
            </button>
          </div>
          <div
            id="tooltip-new"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Home
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>
          <button
            data-tooltip-target="tooltip-settings"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 15"
              aria-hidden="true"
            >
              <g fill="currentColor">
                <path d="m2.5 2c-.27614 0-.5.22386-.5.5s.22386.5.5.5h.2457c.22324 0 .41943.14799.48076.36264l1.58556 5.54944c.18398.64395.77256 1.08792 1.44228 1.08792h4.5687c.6133 0 1.1649-.37343 1.3927-.94291l1.4743-3.6857c.2627-.65686-.2211-1.37139-.9285-1.37139h-8.31292l-.2606-.91208c-.18398-.64395-.77256-1.08792-1.44228-1.08792z" />
                <path d="m6.5 14c.82843 0 1.5-.6716 1.5-1.5s-.67157-1.5-1.5-1.5-1.5.6716-1.5 1.5.67157 1.5 1.5 1.5z" />
                <path d="m10.5 14c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5c-.82843 0-1.5.6716-1.5 1.5s.67157 1.5 1.5 1.5z" />
              </g>
            </svg>

            <span className="sr-only">Cart</span>
          </button>
          <div
            id="tooltip-settings"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Settings
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>
          <button
            data-tooltip-target="tooltip-profile"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span className="sr-only">Profile</span>
          </button>
          <div
            id="tooltip-profile"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Profile
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>
        </div>
      </div>
      {/* Back to top  */}
      <BackToTop />
    </>
  );
};

export default Footer;
