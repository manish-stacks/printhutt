'use client'
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";

import {
  RiCloseFill,
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiMenu2Fill,
  RiMenu3Fill,
  RiTwitterFill,
} from "react-icons/ri";
import Image from "next/image";
import siteLogo from '/public/print-hutt-logo.webp';
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { categoryService } from "@/_services/common/categoryService";
import { productService } from "@/_services/common/productService";
import HeaderCategoryList from "./category-list";
import CartSidebar from "../CartSidebar";
import CategoryPopup from "../CategoryPopup";
// import Headerlocation from "./location";
import SearchBar from "./SearchBar";
import { wishlistService } from "@/_services/common/wishlist";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCategory = () => setIsOpen((prev) => !prev);
  const toggleClose = () => setIsOpen(false);
  const [isCartOpen, setIsOpenCart] = useState(false);
  const toggleCartSidebar = () => setIsOpenCart((prev) => !prev);
  const toggleCartSidebarClose = () => setIsOpenCart(false);

  const [isMobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => setMobileMenu((prev) => !prev);
  const items = useCartStore((state) => state.items);

  const totalItem = items.length;

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const [categoriesData, setCategoriesData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);


  const fetchData = async () => {
    try {
      const [categories, products] = await Promise.all([
        categoryService.getAll(6),
        productService.getTopProducts(6),
      ]);

      setCategoriesData(categories?.categories);
      setProductData(products?.products);

      const response = await wishlistService.getAll();
      setWishlistCount(response.data?.items?.length || 0);

    } catch (error) {
      setWishlistCount(0);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const socialLinks = [
    { icon: RiFacebookFill, link: "https://www.facebook.com/print.hutt" },
    { icon: RiInstagramFill, link: "https://www.instagram.com/printhutt/" },
    { icon: RiTwitterFill, link: "https://twitter.com/printhutt" },
    { icon: RiLinkedinFill, link: "https://www.linkedin.com/company/print-hutt" },
  ];


  return (
    <>
      <header className="bb-header relative z-[5] border-b-[1px] border-solid border-[#eee]">
        <div className="top-header bg-gradient py-[6px] max-[991px]:hidden">
          <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div className="flex flex-wrap w-full">
              <div className="w-full px-[12px]">
                <div className="inner-top-header flex justify-between">
                  <div className="col-left-bar">
                    <a
                      href="shop-left-sidebar-col-3.html"
                      className="transition-all duration-[0.3s] ease-in-out font-Poppins font-light text-[16px] text-[#fff] leading-[28px] tracking-[0.03rem]"
                    >
                      Flat 30% Off On Neon Light Shop.
                    </a>
                  </div>
                  <div className="col-right-bar flex">
                    <div className="cols px-[12px]">
                      <Link
                        href="/faq"
                        className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[16px] text-[#fff] font-light leading-[28px] tracking-[0.03rem]"
                      >
                        Help?
                      </Link>
                    </div>
                    <div className="cols px-[12px]">
                      <a
                        href="https://www.shiprocket.in/shipment-tracking/"
                        className="transition-all duration-[0.3s] ease-in-out font-Poppins text-[16px] text-[#fff] font-light leading-[28px] tracking-[0.03rem]"
                      >
                        Track Order
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-header py-[20px] max-[991px]:py-[15px] max-[375px]:pb-[0px]">
          <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div className="flex flex-wrap w-full">
              <div className="w-full px-[12px]">
                <div className="inner-bottom-header flex justify-between max-[767px]:flex-col">
                  <div className="cols bb-logo-detail flex max-[767px]:justify-between">
                    {/* Header Logo Start */}
                    <div className="header-logo flex items-center max-[575px]:justify-center">
                      <a
                        onClick={toggleMenu}
                        className="bb-toggle-menu flex max-[991px]:flex max-[991px]:mr-[6px] sm:hidden"
                      >
                        <div className="header-icon">
                          <RiMenu2Fill className="text-[22px] text-[#6c7fd8]" />
                        </div>
                      </a>
                      <Link href="/">
                        <Image
                          src={siteLogo}
                          alt="logo"
                          width={180}
                          height={56}
                          className="light w-[180px] max-[991px]:w-[115px] block"
                          priority={true}
                        />
                        <Image
                          src={siteLogo}
                          alt="logo"
                          width={180}
                          height={56}
                          className="dark w-[180px] max-[991px]:w-[115px] hidden"
                          priority={true}
                        />
                      </Link>

                    </div>
                    {/* Header Logo End */}
                    <a
                      onClick={toggleCategory}
                      className="bb-sidebar-toggle bb-category-toggle hidden max-[991px]:flex max-[991px]:items-center max-[991px]:ml-[20px] max-[991px]:border-[1px] max-[991px]:border-solid max-[991px]:border-[#eee] max-[991px]:w-[40px] max-[991px]:h-[40px] max-[991px]:rounded-[15px] justify-center transition-all duration-[0.3s] ease-in-out font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]"
                    >
                      <svg
                        className="svg-icon h-[30px] w-[30px] max-[991px]:w-[22px] max-[991px]:h-[22px]"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="fill-[#6c7fd8]"
                          d="M384 928H192a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V640a32 32 0 0 0-32-32H192zM784 928H640a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v144a32 32 0 0 1-64 0V640a32 32 0 0 0-32-32H640a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h144a32 32 0 0 1 0 64zM384 480H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192zM832 480H640a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM640 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H640z"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="cols flex justify-center">
                    <div className="header-search w-[600px] max-[1399px]:w-[500px] max-[1199px]:w-[400px] max-[991px]:w-full max-[991px]:min-w-[300px] max-[767px]:py-[15px] max-[480px]:min-w-[auto]">
                      <SearchBar />
                    </div>
                  </div>
                  <div className="cols bb-icons justify-center hidden sm:flex">
                    <div className="bb-flex-justify max-[575px]:flex max-[575px]:justify-between">
                      <div className="bb-header-buttons h-full flex justify-end items-center">
                        <div className="bb-acc-drop relative">
                          <Link
                            href={isLoggedIn ? '/user/dashboard' : '/login'}
                            className="bb-header-btn bb-header-user dropdown-toggle bb-user-toggle transition-all duration-[0.3s] ease-in-out relative flex w-[auto] items-center whitespace-nowrap ml-[30px] max-[1199px]:ml-[20px] max-[767px]:ml-[0]"
                            title="Account"
                          >
                            <div className="header-icon relative flex">
                              <svg
                                className="svg-icon w-[30px] h-[30px] max-[1199px]:w-[25px] max-[1199px]:h-[25px] max-[991px]:w-[22px] max-[991px]:h-[22px]"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="fill-[#6c7fd8]"
                                  d="M512.476 648.247c-170.169 0-308.118-136.411-308.118-304.681 0-168.271 137.949-304.681 308.118-304.681 170.169 0 308.119 136.411 308.119 304.681C820.594 511.837 682.645 648.247 512.476 648.247L512.476 648.247zM512.476 100.186c-135.713 0-246.12 109.178-246.12 243.381 0 134.202 110.407 243.381 246.12 243.381 135.719 0 246.126-109.179 246.126-243.381C758.602 209.364 648.195 100.186 512.476 100.186L512.476 100.186zM935.867 985.115l-26.164 0c-9.648 0-17.779-6.941-19.384-16.35-2.646-15.426-6.277-30.52-11.142-44.95-24.769-87.686-81.337-164.13-159.104-214.266-63.232 35.203-134.235 53.64-207.597 53.64-73.555 0-144.73-18.537-208.084-53.922-78 50.131-134.75 126.68-159.564 214.549 0 0-4.893 18.172-11.795 46.4-2.136 8.723-10.035 14.9-19.112 14.9L88.133 985.116c-9.415 0-16.693-8.214-15.47-17.452C91.698 824.084 181.099 702.474 305.51 637.615c58.682 40.472 129.996 64.267 206.966 64.267 76.799 0 147.968-23.684 206.584-63.991 124.123 64.932 213.281 186.403 232.277 329.772C952.56 976.901 945.287 985.115 935.867 985.115L935.867 985.115z"
                                />
                              </svg>
                            </div>
                            <div className="bb-btn-desc flex flex-col ml-[10px] max-[1199px]:hidden">
                              <span className="bb-btn-title font-Poppins transition-all duration-[0.3s] ease-in-out text-[12px] leading-[1] text-[#3d4750] mb-[4px] tracking-[0.6px] capitalize font-medium whitespace-nowrap">
                                Account
                              </span>
                              <span className="bb-btn-stitle font-Poppins transition-all duration-[0.3s] ease-in-out text-[14px] leading-[16px] font-semibold text-[#3d4750]  tracking-[0.03rem] whitespace-nowrap">
                                {isLoggedIn ? 'Dashboard' : 'Login'}
                              </span>
                            </div>
                          </Link>
                          <ul className="bb-dropdown-menu min-w-[150px] py-[10px] px-[5px] transition-all duration-[0.3s] ease-in-out mt-[25px] absolute z-[16] text-left opacity-[0] right-[auto] bg-[#fff] border-[1px] border-solid border-[#eee] block rounded-[10px]">
                            {isLoggedIn ? (
                              <li className="py-[4px] px-[15px] m-[0] font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                                <Link
                                  className="dropdown-item transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] hover:text-[#6c7fd8] leading-[22px] block w-full font-normal tracking-[0.03rem]"
                                  href="/user/dashboard"
                                >
                                  My Profile
                                </Link>
                              </li>
                            ) : (
                              <li className="py-[4px] px-[15px] m-[0] font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem]">
                                <Link
                                  className="dropdown-item transition-all duration-[0.3s] ease-in-out font-Poppins text-[13px] hover:text-[#6c7fd8] leading-[22px] block w-full font-normal tracking-[0.03rem]"
                                  href="/login"
                                >
                                  Login
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                        <Link
                          href="/wishlist"
                          className="bb-header-btn bb-wish-toggle transition-all duration-[0.3s] ease-in-out relative flex w-[auto] items-center ml-[30px] max-[1199px]:ml-[20px]"
                          title="Wishlist"
                        >
                          <div className="header-icon relative flex">
                            <svg
                              className="svg-icon w-[30px] h-[30px] max-[1199px]:w-[25px] max-[1199px]:h-[25px] max-[991px]:w-[22px] max-[991px]:h-[22px]"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="fill-[#6c7fd8]"
                                d="M512 128l121.571556 250.823111 276.366222 39.111111-199.281778 200.504889L756.622222 896 512 769.536 267.377778 896l45.852444-277.617778-199.111111-200.504889 276.366222-39.111111L512 128m0-56.888889a65.962667 65.962667 0 0 0-59.477333 36.807111l-102.940445 213.703111-236.828444 35.214223a65.422222 65.422222 0 0 0-52.366222 42.979555 62.577778 62.577778 0 0 0 15.274666 64.967111l173.511111 173.340445-40.248889 240.355555a63.374222 63.374222 0 0 0 26.993778 62.577778 67.242667 67.242667 0 0 0 69.632 3.726222L512 837.290667l206.478222 107.605333a67.356444 67.356444 0 0 0 69.688889-3.726222 63.374222 63.374222 0 0 0 26.908445-62.577778l-40.277334-240.355556 173.511111-173.340444a62.577778 62.577778 0 0 0 15.246223-64.967111 65.422222 65.422222 0 0 0-52.366223-42.979556l-236.8-35.214222-102.968889-213.703111A65.848889 65.848889 0 0 0 512 71.111111z"
                                fill="#364C58"
                              />
                            </svg>
                          </div>
                          <div className="bb-btn-desc flex flex-col ml-[10px] max-[1199px]:hidden">
                            <span className="bb-btn-title font-Poppins transition-all duration-[0.3s] ease-in-out text-[12px] leading-[1] text-[#3d4750] mb-[4px] tracking-[0.6px] capitalize font-medium whitespace-nowrap">
                              <b className="bb-wishlist-count">{wishlistCount}</b> items
                            </span>
                            <span className="bb-btn-stitle font-Poppins transition-all duration-[0.3s] ease-in-out text-[14px] leading-[16px] font-semibold text-[#3d4750]  tracking-[0.03rem] whitespace-nowrap">
                              Wishlist
                            </span>
                          </div>
                        </Link>
                        <a
                          onClick={toggleCartSidebar}
                          className="bb-header-btn bb-cart-toggle transition-all duration-[0.3s] ease-in-out relative flex w-[auto] items-center ml-[30px] max-[1199px]:ml-[20px] cursor-pointer"
                          title="Cart"
                        >
                          <div className="header-icon relative flex">
                            <svg
                              className="svg-icon w-[30px] h-[30px] max-[1199px]:w-[25px] max-[1199px]:h-[25px] max-[991px]:w-[22px] max-[991px]:h-[22px]"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="fill-[#6c7fd8]"
                                d="M351.552 831.424c-35.328 0-63.968 28.64-63.968 63.968 0 35.328 28.64 63.968 63.968 63.968 35.328 0 63.968-28.64 63.968-63.968C415.52 860.064 386.88 831.424 351.552 831.424L351.552 831.424 351.552 831.424zM799.296 831.424c-35.328 0-63.968 28.64-63.968 63.968 0 35.328 28.64 63.968 63.968 63.968 35.328 0 63.968-28.64 63.968-63.968C863.264 860.064 834.624 831.424 799.296 831.424L799.296 831.424 799.296 831.424zM862.752 799.456 343.264 799.456c-46.08 0-86.592-36.448-92.224-83.008L196.8 334.592 165.92 156.128c-1.92-15.584-16.128-28.288-29.984-28.288L95.2 127.84c-17.664 0-32-14.336-32-31.968 0-17.664 14.336-32 32-32l40.736 0c46.656 0 87.616 36.448 93.28 83.008l30.784 177.792 54.464 383.488c1.792 14.848 15.232 27.36 28.768 27.36l519.488 0c17.696 0 32 14.304 32 31.968S880.416 799.456 862.752 799.456L862.752 799.456zM383.232 671.52c-16.608 0-30.624-12.8-31.872-29.632-1.312-17.632 11.936-32.928 29.504-34.208l433.856-31.968c15.936-0.096 29.344-12.608 31.104-26.816l50.368-288.224c1.28-10.752-1.696-22.528-8.128-29.792-4.128-4.672-9.312-7.04-15.36-7.04L319.04 223.84c-17.664 0-32-14.336-32-31.968 0-17.664 14.336-31.968 32-31.968l553.728 0c24.448 0 46.88 10.144 63.232 28.608 18.688 21.088 27.264 50.784 23.52 81.568l-50.4 288.256c-5.44 44.832-45.92 81.28-92 81.28L385.6 671.424C384.8 671.488 384 671.52 383.232 671.52L383.232 671.52zM383.232 671.52"
                              />
                            </svg>
                            <span className="main-label-note-new" />
                          </div>
                          <div className="bb-btn-desc flex flex-col ml-[10px] max-[1199px]:hidden">
                            <span className="bb-btn-title font-Poppins transition-all duration-[0.3s] ease-in-out text-[12px] leading-[1] text-[#3d4750] mb-[4px] tracking-[0.6px] capitalize font-medium whitespace-nowrap">
                              <b className="bb-cart-count">{totalItem}</b> items
                            </span>
                            <span className="bb-btn-stitle font-Poppins transition-all duration-[0.3s] ease-in-out text-[14px] leading-[16px] font-semibold text-[#3d4750]  tracking-[0.03rem] whitespace-nowrap">
                              Cart
                            </span>
                          </div>
                        </a>
                        <button
                          onClick={toggleMenu}
                          className="bb-toggle-menu hidden max-[991px]:flex max-[991px]:ml-[20px]"
                        >
                          <div className="header-icon">
                            <RiMenu3Fill className="text-[22px] text-[#6c7fd8]" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bb-main-menu-desk bg-[#fff] py-[5px] border-t-[1px] border-solid border-[#eee] max-[991px]:hidden">
          <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div className="flex flex-wrap w-full">
              <div className="w-full px-[12px]">
                <div className="bb-inner-menu-desk flex max-[1199px]:relative max-[991px]:justify-between">
                  <a
                    onClick={toggleCategory}
                    className="bb-header-btn bb-sidebar-toggle bb-category-toggle transition-all duration-[0.3s] ease-in-out h-[45px] w-[45px] mr-[30px] p-[8px] flex items-center justify-center bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px] relative max-[767px]:m-[0] max-[575px]:hidden"
                  >
                    <svg
                      className="svg-icon w-[25px] h-[25px]"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="fill-[#6c7fd8]"
                        d="M384 928H192a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V640a32 32 0 0 0-32-32H192zM784 928H640a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v144a32 32 0 0 1-64 0V640a32 32 0 0 0-32-32H640a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h144a32 32 0 0 1 0 64zM384 480H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192zM832 480H640a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM640 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H640z"
                      />
                    </svg>
                  </a>

                  <button
                    className="navbar-toggler shadow-none hidden"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i className="ri-menu-2-line" />
                  </button>
                  <div
                    className="bb-main-menu relative flex flex-[auto] justify-start max-[991px]:hidden"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav flex flex-wrap flex-row ">
                      <li className="nav-item flex items-center font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem] mr-[35px]">
                        <Link
                          className="nav-link p-[0] font-Poppins leading-[28px] text-[15px] font-medium text-[#3d4750] tracking-[0.03rem] block"
                          href="/"
                        >
                          Home
                        </Link>
                      </li>
                      <Suspense fallback={<div>Loading...</div>}>
                        <HeaderCategoryList categories={categoriesData} />
                      </Suspense>
                      <li className="nav-item bb-dropdown flex items-center relative mr-[45px]">
                        <Link
                          className="nav-link font-Poppins relative p-[0] leading-[28px] text-[15px] font-medium text-[#3d4750] block tracking-[0.03rem]"
                          href="/products"
                        >
                          Products
                        </Link>
                      </li>
                      <li className="nav-item bb-dropdown flex items-center relative mr-[45px]">
                        <Link
                          href="/about-us"
                          className="nav-link font-Poppins relative p-[0] leading-[28px] text-[15px] font-medium text-[#3d4750] block tracking-[0.03rem]"

                        >
                          About Us
                        </Link>

                      </li>
                      <li className="nav-item flex items-center relative mr-[45px]">
                        <Link
                          className="nav-link font-Poppins relative p-[0] leading-[28px] text-[15px] font-medium text-[#3d4750] block tracking-[0.03rem]"
                          href="/blog"
                        >
                          Blog
                        </Link>
                      </li>
                      <li className="nav-item flex items-center">
                        <Link
                          className="nav-link font-Poppins  p-[0] leading-[28px] text-[15px] font-medium tracking-[0.03rem] text-[#3d4750] flex"
                          href="/offer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            x={0}
                            y={0}
                            viewBox="0 0 64 64"
                            // style={{ enableBackground: "new 0 0 512 512" }}
                            xmlSpace="preserve"
                            className="w-[20px] h-[25px] mr-[5px] leading-[18px] align-middle"
                          >
                            <g>
                              <path
                                d="M10 16v22c0 .3.1.6.2.8.3.6 6.5 13.8 21 20h.2c.2 0 .3.1.5.1s.3 0 .5-.1h.2c14.5-6.2 20.8-19.4 21-20 .1-.3.2-.5.2-.8V16c0-.9-.6-1.7-1.5-1.9-7.6-1.9-19.3-9.6-19.4-9.7-.1-.1-.2-.1-.4-.2-.1 0-.1 0-.2-.1h-.9c-.1 0-.2.1-.3.1-.1.1-.2.1-.4.2s-11.8 7.8-19.4 9.7c-.7.2-1.3 1-1.3 1.9zm4 1.5c6.7-2.1 15-7.2 18-9.1 3 1.9 11.3 7 18 9.1v20c-1.1 2.1-6.7 12.1-18 17.3-11.3-5.2-16.9-15.2-18-17.3z"
                                fill="#000000"
                                opacity={1}
                                data-original="#000000"
                                className="fill-[#6c7fd8]"
                              />
                              <path
                                d="M28.6 38.4c.4.4.9.6 1.4.6s1-.2 1.4-.6l9.9-9.9c.8-.8.8-2 0-2.8s-2-.8-2.8 0L30 34.2l-4.5-4.5c-.8-.8-2-.8-2.8 0s-.8 2 0 2.8z"
                                fill="#000000"
                                opacity={1}
                                data-original="#000000"
                                className="fill-[#6c7fd8]"
                              />
                            </g>
                          </svg>
                          Offers
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* <div className="bb-dropdown-menu flex max-[991px]:hidden">
                    <div className="inner-select w-[180px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[10px] flex items-center">
                      <svg
                        className="svg-icon m-[10px] w-[25px] h-[25px] align-middle"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M511.614214 958.708971c-21.76163 0-41.744753-9.781784-54.865586-26.862811L222.50156 626.526383c-3.540639-4.044106-5.872754-7.978718-7.349385-10.461259-41.72838-58.515718-63.959707-127.685078-63.959707-199.699228 0.87288-193.650465 162.903184-351.075891 361.209691-351.075891 198.726064 0 360.40435 157.49194 360.40435 351.075891-0.839111 72.190159-23.070438 140.856052-64.345494 199.053522-1.962701 3.288906-4.312212 7.189749-7.735171 11.098779L566.479799 931.847184c-13.120832 17.080004-33.103956 26.861788-54.865585 26.861787zM273.525654 580.51956a33.707706 33.707706 0 0 1 2.63399 3.037173L511.278569 890.00931 747.068783 583.556733c0.435928-0.569982 0.889253-1.124614 1.358951-1.669013l2.51631-4.102434c0.285502-0.453325 0.587378-0.89744 0.889253-1.325182 33.507138-46.921659 51.577702-102.416578 52.248991-160.487158 0-155.294902-130.839931-281.95565-291.679105-281.95565-160.571069 0-291.780413 126.72931-292.484448 282.501073 0 57.450457 17.802458 112.811322 51.460022 159.933549l2.90312 4.580318c0.418532 0.73678-0.186242 0.032746-0.756223-0.512676z m476.059439 0.100284v0z m0.066515-0.058329c-0.016373 0.016373-0.033769 0.025583-0.033769 0.041956 0.001023-0.016373 0.017396-0.025583 0.033769-0.041956z m0.051166-0.041955a0.227174 0.227174 0 0 0-0.050142 0.041955c0.016373-0.016373 0.032746-0.033769 0.050142-0.041955z"
                          fill="#444444"
                          className="fill-[#6c7fd8]"
                        />
                        <path
                          d="M512 577.206094c-90.000803 0-163.222455-73.221652-163.222455-163.222455s73.221652-163.222455 163.222455-163.222455S675.222455 323.982836 675.222455 413.983639s-73.222675 163.222455-163.222455 163.222455z m0-240.538355c-42.634006 0-77.3159 34.68087-77.3159 77.3159s34.68087 77.3159 77.3159 77.3159 77.3159-34.681894 77.3159-77.3159-34.681894-77.3159-77.3159-77.3159z"
                          fill="#00D8A0"
                          className="fill-[#6c7fd8]"
                        />
                      </svg>
                      <div className="custom-select transition-all duration-[0.3s] ease-in-out w-full h-full pr-[15px] text-[#777] flex items-center justify-between text-[14px] relative">
                        <Headerlocation />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Meneu */}
        {isMobileMenu && (
          <div
            className="bb-mobile-menu-overlay w-full h-screen fixed top-[0] left-[0] bg-[#000000cc] z-[16]"
            onClick={toggleMenu}
          />
        )}

        <div
          id="bb-mobile-menu"
          className={`bb-mobile-menu transition-all duration-[0.3s] ease-in-out w-[340px] h-full pt-[15px] px-[20px] pb-[20px] fixed top-[0] right-[auto] left-[0] bg-[#fff] ${isMobileMenu ? "translate-x-0" : "translate-x-[-100%]"
            } flex flex-col z-[17] overflow-auto max-[480px]:w-[300px]`}
        >
          <div className="bb-menu-title w-full pb-[10px] flex flex-wrap justify-between">
            <span className="menu_title font-Poppins flex items-center text-[16px] text-[#3d4750] font-semibold leading-[26px] tracking-[0.02rem]">
              My Menu
            </span>
            <button
              type="button"
              onClick={toggleMenu}
              className="bb-close-menu relative border-[0] text-[30px] leading-[1] text-[#ff0000] bg-transparent"
            >
              <RiCloseFill />
            </button>
          </div>
          <div className="bb-menu-inner">
            <div className="bb-menu-content">
              <ul>
                <li className="relative">
                  <Link
                    href="/"
                    className="transition-all duration-[0.3s] ease-in-out mb-[12px] p-[12px] block font-Poppins capitalize text-[#686e7d] border-[1px] border-solid border-[#eee] rounded-[10px] text-[15px] font-medium leading-[28px] tracking-[0.03rem]"
                  >
                    Home
                  </Link>
                </li>
                <li className="relative">
                  <a
                    className="transition-all duration-[0.3s] ease-in-out mb-[12px] p-[12px] block font-Poppins capitalize text-[#686e7d] border-[1px] border-solid border-[#eee] rounded-[10px] text-[15px] font-medium leading-[28px] tracking-[0.03rem]">
                    Categories
                  </a>

                </li>
                <li className="relative">
                  <Link
                    href="/products"
                    className="transition-all duration-[0.3s] ease-in-out mb-[12px] p-[12px] block font-Poppins capitalize text-[#686e7d] border-[1px] border-solid border-[#eee] rounded-[10px] text-[15px] font-medium leading-[28px] tracking-[0.03rem]"
                  >
                    Products
                  </Link>

                </li>
                <li className="relative">
                  <Link
                    href="/about-us"
                    className="transition-all duration-[0.3s] ease-in-out mb-[12px] p-[12px] block font-Poppins capitalize text-[#686e7d] border-[1px] border-solid border-[#eee] rounded-[10px] text-[15px] font-medium leading-[28px] tracking-[0.03rem]"
                  >
                    About-us
                  </Link>

                </li>
                <li className="relative">
                  <Link
                    href="/blog"
                    className="transition-all duration-[0.3s] ease-in-out mb-[12px] p-[12px] block font-Poppins capitalize text-[#686e7d] border-[1px] border-solid border-[#eee] rounded-[10px] text-[15px] font-medium leading-[28px] tracking-[0.03rem]"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="header-res-lan-curr">
              {/* Social Start */}
              <div className="header-res-social mt-[30px]">
                <div className="header-top-social">
                  <ul className="flex flex-row justify-center mb-[0]">

                    {
                      socialLinks && socialLinks.map((item, index) => (
                        <li key={index} className="list-inline-item w-[30px] h-[30px] flex items-center justify-center bg-[#3d4750] rounded-[10px] mr-[.5rem]">
                          <a
                            href={item.link}
                            className="transition-all duration-[0.3s] ease-in-out"
                          >
                            <item.icon className="text-[#fff] text-[15px]" />
                          </a>
                        </li>
                      ))
                    }

                  </ul>
                </div>
              </div>
              {/* Social End */}
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <Suspense fallback={null}>
          <CategoryPopup onClose={toggleClose} category={categoriesData} products={productData} />
        </Suspense>
      )}
      {isCartOpen && <CartSidebar onClose={toggleCartSidebarClose} />}
    </>
  );
};


