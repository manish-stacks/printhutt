import Link from "next/link";
import React from "react";
import {
  FaCartPlus,
  FaFacebookF,
  FaHeart,
  FaHome,
  FaInstagram,
  FaLinkedinIn,
  FaProductHunt,
  FaTwitter,
  FaUserCircle,
  FaYoutube,
} from "react-icons/fa";

import BackToTop from "./BackToTop";
import Image from "next/image";
import QuickView from "./QuickView";
import useQuickStore from "@/store/useQuickStore";
import CartSidebar from "./CartSidebar";
import useCartSidebarStore from "@/store/useCartSidebarStore";


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isQuickViewOpen = useQuickStore(state => state.isOpen);
  const isCartOpen = useCartSidebarStore(state => state.isOpen);
  const product = useQuickStore(state => state.product);

  // console.log(product)

  const handleQuickViewClose = () => {
    useQuickStore.setState({ isOpen: false });
  };
  const toggleCartSidebarClose = () => {
    useCartSidebarStore.setState({ isOpen: false });
  };

  return (
    <>
      {/* footer */}
      <footer className="bb-footer  bg-[#f8f8fb] text-[#fff]">
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
                      Premium quality. The best quality materials used to create the perfect sign for you.  Replacement or fixing facility in case of damage during installation.
                    </p>
                  </div>
                </div>
                <div className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-info max-[480px]:hidden">
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
                          <Link
                            href={"/category/neon"}
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Neon Light
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href={"/category/lamps"}
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Lamps
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href={"/category/frames"}
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Frames
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href="/category/acrylic"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Acrylic
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href="shop-list-full-col-2"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Keychains
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center">
                          <Link
                            href="/category/magnet"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Magnet
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-account max-[480px]:hidden">
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
                          <Link
                            href="/about-us"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            About us
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href="/user/orders"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Order
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href={"/privacy-policy"}
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href="/terms-and-conditions"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Terms &amp; conditions
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href="/refund-policy"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Refund Policy
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center">
                          <Link
                            href="/contact-us"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Contact us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[16.66%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-service max-[480px]:hidden">
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
                          <Link
                            href="/login"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Sign In
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href="/cart"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            View Cart
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href="/return-policy"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Return Policy
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <Link
                            href="/wishlist"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Wishlist
                          </Link>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center mb-[16px] max-[991px]:mb-[15px]">
                          <a
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Affiliate Program
                          </a>
                        </li>
                        <li className="bb-footer-link leading-[1.5] flex items-center">
                          <Link
                            href="/user/payment"
                            className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] hover:text-[#6c7fd8] mb-[0] inline-block break-all tracking-[0] font-normal"
                          >
                            Payments
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="min-[992px]:w-[25%] max-[991px]:w-full w-full px-[12px] bb-footer-toggle bb-footer-cont-social max-[480px]:hidden">
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
                              25 krishna market, Delhi, 110034.
                              Working Days/Hours:
                              Mon - Sun / 9:00 AM - 8:00 PM
                            </p>
                          </li>
                          <li className="bb-footer-link bb-foo-call flex items-start max-[991px]:mb-[15px] mb-[16px]">
                            <span className="w-[25px] basis-[auto] grow-[0] shrink-[0]">
                              <i className="ri-whatsapp-line leading-[0] text-[18px] text-[#6c7fd8]" />
                            </span>
                            <Link
                              href="tel:+918800112625"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] inline-block relative break-all tracking-[0] font-normal max-[1399px]:text-[15px] max-[1199px]:text-[14px]"
                            >
                              +91-880 011 2625
                            </Link>
                          </li>
                          <li className="bb-footer-link bb-foo-mail flex">
                            <span className="w-[25px] basis-[auto] grow-[0] shrink-[0]">
                              <i className="ri-mail-line leading-[0] text-[18px] text-[#6c7fd8]" />
                            </span>
                            <a
                              href="mailto:printhutt05@gmail.com"
                              className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[14px] leading-[20px] text-[#686e7d] inline-block relative break-all tracking-[0] font-normal max-[1399px]:text-[15px] max-[1199px]:text-[14px]"
                            >
                              printhutt05@gmail.com
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
                              href="https://www.facebook.com/printhutt"
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
                              href="https://www.instagram.com/printhutt/"
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <FaInstagram className="text-[16px] text-[#fff]" />
                            </a>
                          </li>
                          <li className="bb-footer-link leading-[1.5] flex items-center pr-[5px]">
                            <a
                              href="https://www.youtube.com/@printhutt7917"
                              className="transition-all duration-[0.3s] ease-in-out w-[30px] h-[30px] rounded-[5px] bg-[#3d4750] hover:bg-[#6c7fd8] capitalize flex items-center justify-center text-[15px] leading-[20px] text-[#686e7d] relative break-all font-normal"
                            >
                              <FaYoutube className="text-[16px] text-[#fff]" />
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
                          {""} PrintHutt  {" "}
                        </Link>
                        all rights reserved.
                      </div>
                    </div>
                  </div>
                  <div className="footer-bottom-right">
                    <div className="footer-bottom-payment flex justify-center">
                      <div className="payment-link">
                        <Image
                          width={200}
                          height={100}
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


      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 block lg:hidden md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link
            href="/cart"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 group"
          >
            <FaCartPlus className="text-gray-600 text-xl" />
          </Link>

          <Link
            href="/wishlist"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <FaHeart className="text-gray-600 text-xl" />
          </Link>

          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              <FaHome className="text-white text-xl" />
            </Link>
          </div>

          <Link
            href="/products"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <FaProductHunt className="text-gray-600 text-xl" />
          </Link>

          <Link
            href="/login"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 group"
          >
            <FaUserCircle className="text-gray-600 text-xl" />
          </Link>

        </div>
      </div>


      {isQuickViewOpen && (
        <QuickView
          product={product}
          onClose={handleQuickViewClose}
        />
      )}
      {isCartOpen && <CartSidebar onClose={toggleCartSidebarClose} />}
      <BackToTop />
    </>
  )
}

export default Footer;
