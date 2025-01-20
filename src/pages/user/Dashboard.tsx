"use client";
import React, { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import UserSidebar from "@/components/user/user-sidebar";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const userData = useUserStore((state) => state.userDetails);
  const router = useRouter();

  useEffect(() => {
    if (!userData?.email) {
      router.push('/user/profile');
    }
  }, [userData, router]);

  if (!userData?.email) {
    return null; // or a loading spinner
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
