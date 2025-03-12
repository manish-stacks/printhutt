"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import UserSidebar from "@/components/user/user-sidebar";
import { useUserStore } from "@/store/useUserStore";
import axios from "axios";
import { RiMacFill, RiNewsFill, RiShoppingCartFill, RiWalletFill } from "react-icons/ri";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

const Dashboard = () => {
  const userData = useUserStore((state) => state.userDetails);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/v1/user');
        console.log(res.data);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Breadcrumb title={"Dashboard"} />
      <section className="section-about py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <UserSidebar activemenu={'dashboard'} />
            {/* Main Content */}
            <div className="flex-1 p-6 pt-0">
              <div className="bg-purple-600 text-white rounded-lg p-8 flex items-center justify-between mb-6 w-full max-w-full">
                <div className="flex items-center space-x-4">
                  <div>
                    <h2 className="text-lg font-semibold">Welcome back</h2>
                    <h3>User</h3>
                  </div>
                </div>
              </div>

              {!userData?.email && (
                <div className="bg-red-100 rounded-lg p-5 flex items-center justify-between mb-6  mx-auto border border-red-300 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <p className="text-red-600 font-semibold">Please update your profile to complete your setup.</p>
                  </div>
                  <Link
                    href="/user/profile"
                    className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-200 ease-in-out"
                  >
                    Update Profile
                  </Link>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full max-w-full">
                <div className="p-5 rounded-lg shadow-md bg-slate-100 ">
                  <div className="flex gap-4 md:px-3 md:py-4 ">
                    <div className="p-3 bg-slate-300 rounded-full">
                      <RiShoppingCartFill className="text-3xl text-[#FB285E]" />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span>{data?.totalOrders || 0}</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Total Orders
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div className="p-3 bg-slate-300 rounded-full">
                      <RiWalletFill className="text-3xl text-[#FB285E]" />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span>{data?.totalAmount || 0}</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Total Amount
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div className="p-3 bg-slate-300 rounded-full">
                      <RiMacFill className="text-3xl text-[#FB285E]" />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span>{data?.totalAddress || 0}</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Total Address
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div className="p-3 bg-slate-300 rounded-full">
                      <RiNewsFill className="text-3xl text-[#FB285E]" />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span>{data?.totalReview || 0}</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Total Review
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div className="p-3 bg-slate-300 rounded-full">
                      <RiNewsFill className="text-3xl text-[#FB285E]" />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span>{data?.totalWishlist || 0}</span>
                      </p>
                      <p className="text-lg font-medium leading-[18px] dark:text-blackColor-dark">
                        Total Wishlist
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg shadow-md bg-slate-100">
                  <div className="flex gap-4 md:px-3 md:py-4">
                    <div>
                      <RiNewsFill className="text-3xl text-[#FB285E]" />
                    </div>
                    <div>
                      <p className="text-3xl leading-[1.1] text-slate-600 font-bold font-hind dark:text-blackColor-dark">
                        <span>0</span>
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
