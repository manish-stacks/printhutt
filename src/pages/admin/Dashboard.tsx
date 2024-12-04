import { RecentActivity } from '@/components/admin/dashboard/RecentActivity';
import { StatsCard } from '@/components/admin/dashboard/StatsCard';
import React from 'react'
import { FaDollarSign, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { RiTrademarkLine } from 'react-icons/ri';


const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '10.5k', trend: 12, Icon: FaUsers, color: 'bg-blue-500' },
    { title: 'Revenue', value: '$45.2k', trend: 8, Icon: FaDollarSign, color: 'bg-green-500' },
    { title: 'Orders', value: '1,456', trend: -3, Icon: FaShoppingCart, color: 'bg-purple-500' },
    { title: 'Growth', value: '28.6%', trend: 15, Icon: RiTrademarkLine, color: 'bg-orange-500' },
  ];

  return (
    <>
      {/* <main className="pt-16 lg:pl-64"> */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="my-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-gray-500">Welcome back, here's what's happening today.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full max-w-full mt-4">
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
          </div>




          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Revenue</h2>
              <div className="mt-4 h-[300px] flex items-center justify-center text-gray-500">
                Chart placeholder
              </div>
            </div>
            <RecentActivity />
          </div>
        </div>
      {/* </main> */}
    </>
  )
}

export default Dashboard