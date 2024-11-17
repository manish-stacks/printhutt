import React from "react";

import {
  RiDeleteBin2Fill,
  RiEyeFill
} from "react-icons/ri";

const AdminDashboard = () => {

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      role: "Subscriber",
    },
    { id: 4, name: "Sarah Brown", email: "sarah@example.com", role: "Admin" },
  ];

  return (
    <>
      <div className="flex-1 p-6">
        {/* Profile Header */}
        <div className="bg-purple-600 text-white rounded-lg p-8 flex items-center justify-between mb-6 w-full max-w-full">
          <div className="flex items-center space-x-4">
            <img
              className="w-16 h-16 rounded-full"
              src="https://html.themewin.com/edurcok-preview-tailwind/edurock/assets/images/dashbord/dashbord__2.jpg"
              alt="Profile"
            />
            <div className="pl-4">
              <h2 className="text-lg font-semibold">Hello</h2>
              <h3>Admin</h3>
            </div>
          </div>
        </div>
        {/* Dashboard Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full max-w-full">
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

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light text-gray-600">
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b hover:bg-gray-200 transition-colors`}
                >
                  <td className="py-3 px-6">{row.id}</td>
                  <td className="py-3 px-6">{row.name}</td>
                  <td className="py-3 px-6">{row.email}</td>
                  <td className="py-3 px-6">{row.role}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <RiEyeFill />
                    </button>

                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <RiDeleteBin2Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
