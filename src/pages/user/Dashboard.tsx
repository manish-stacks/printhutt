"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import {
  RiBankCard2Fill,
  RiHeart2Fill,
  RiHome2Fill,
  RiLogoutCircleRFill,
  RiMap2Fill,
  RiMessage2Fill,
  RiShoppingCartFill,
  RiStarHalfFill,
  RiUser2Fill,
} from "react-icons/ri";
import { toast } from "react-toastify";

const Dashboard = () => {

  const router = useRouter();
  const logoutStore = useUserStore((state) => state.logout);

  const logOut = async () => {
    await logoutStore();
    toast("logout successfully");
    router.push("/login");
  };



  return (
    <>
      <Breadcrumb title={"Dashboard"} />

      <section className="section-about py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <aside className="w-full md:w-1/4 lg:w-1/5 bg-white p-4 shadow-md border ">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold mt-4">Michle Obema</h2>
                <p className="text-gray-500">Welcome, Michle Obema</p>
              </div>
              <nav className="space-y-2 text-lg leading-9">
                <a
                  href="#"
                  className="flex items-center text-purple-600 font-semibold"
                >
                  <span className="mr-2">
                    <RiHome2Fill />
                  </span>{" "}
                  Dashboard
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <span className="mr-2">
                    <RiUser2Fill />
                  </span>{" "}
                  My Profile
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <span className="mr-2">
                    <RiMap2Fill />
                  </span>{" "}
                  My Adddress
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <span className="mr-2">
                    <RiMessage2Fill />
                  </span>{" "}
                  Message
                  <span className="ml-auto bg-purple-600 text-white text-xs rounded-full px-2 py-1">
                    12
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <span className="mr-2">
                    <RiHeart2Fill />
                  </span>{" "}
                  Wishlist
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <span className="mr-2">
                    <RiStarHalfFill />
                  </span>{" "}
                  Reviews
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <span className="mr-2">
                    <RiBankCard2Fill />
                  </span>{" "}
                  Payment
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <span className="mr-2">
                    <RiShoppingCartFill />
                  </span>{" "}
                  Order History
                </a>
              </nav>
              <div className="mt-8 border-t pt-4 text-lg">
                <p className="text-gray-400 text-sm">Seting</p>
                <button
                  onClick={logOut}
                  className="flex items-center text-gray-600 hover:text-purple-600 mt-2 cursor-pointer"
                >
                  <span className="mr-2">
                    <RiLogoutCircleRFill />
                  </span>{" "}
                  Log-out
                </button>
              </div>
            </aside>
            {/* Main Content */}
            <div className="flex-1 p-6 pt-0">
              {/* Profile Header */}
              <div className="bg-purple-600 text-white rounded-lg p-8 flex items-center justify-between mb-6 w-full max-w-full">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-16 h-16 rounded-full"
                    src="https://html.themewin.com/edurcok-preview-tailwind/edurock/assets/images/dashbord/dashbord__2.jpg"
                    alt="Profile"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">Hello</h2>
                    <h3>Admin</h3>
                  </div>
                </div>
              </div>
              {/* Dashboard Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full max-w-full">
                <div className="p-5 rounded-lg shadow-md bg-slate-100 ">
                  <div className="flex gap-4 md:px-3 md:py-4 ">
                    <div>
                      <img
                        src="https://html.themewin.com/edurcok-preview-tailwind/edurock/assets/images/counter/counter__1.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span data-countup-number={27}>27</span>
                        <span>+</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Enrolled Courses
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div>
                      <img
                        src="https://html.themewin.com/edurcok-preview-tailwind/edurock/assets/images/counter/counter__2.png"
                        alt="g"
                      />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span data-countup-number={27}>8</span>
                        <span>+</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Active Courses
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div>
                      <img
                        src="https://html.themewin.com/edurcok-preview-tailwind/edurock/assets/images/counter/counter__3.png"
                        alt="g"
                      />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span data-countup-number={27}>5</span>
                        <span>k</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Complete Courses
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div>
                      <img
                        src="https://html.themewin.com/edurcok-preview-tailwind/edurock/assets/images/counter/counter__4.png"
                        alt="g"
                      />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span data-countup-number={27}>8</span>
                        <span>+</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Total Courses
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div>
                      <img
                        src="https://html.themewin.com/edurcok-preview-tailwind/edurock/assets/images/counter/counter__3.png"
                        alt="g"
                      />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span data-countup-number={27}>10</span>
                        <span>k</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Active Courses
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div>
                      <img
                        src="https://html.themewin.com/edurcok-preview-tailwind/edurock/assets/images/counter/counter__4.png"
                        alt="g"
                      />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span data-countup-number={27}>30,000</span>
                        <span>k</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Total Earning
                      </p>
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
};

export default Dashboard;
