import React from 'react'
import { RiHome8Line } from 'react-icons/ri'

const Sidebar = () => {
  return (
    <>
      <div className="w-1/6 bg-gray-800 text-white p-5">
        <h1 className="text-3xl font-bold mb-6">
          <span className="tracking-wide">PrintHutt</span>
        </h1>
        <nav>
          <div className="text-lg py-2 px-3 bg-gray-700 rounded mb-2  flex gap-2">
            <div className="p-1">
              <RiHome8Line />
            </div>
            <span>Dashboard</span>
          </div>
          <div className="text-lg py-2 px-3 rounded mb-2  flex gap-2">
            <div className="p-1">
              <RiHome8Line />
            </div>
            <span>Dashboard</span>
          </div>
          <div className="text-lg py-2 px-3 rounded mb-2  flex gap-2">
            <div className="p-1">
              <RiHome8Line />
            </div>
            <span>Dashboard</span>
          </div>
          <div className="text-lg py-2 px-3 rounded mb-2  flex gap-2">
            <div className="p-1">
              <RiHome8Line />
            </div>
            <span>Dashboard</span>
          </div>
          <div className="text-lg py-2 px-3 rounded mb-2  flex gap-2">
            <div className="p-1">
              <RiHome8Line />
            </div>
            <span>Dashboard</span>
          </div>
          <div className="text-lg py-2 px-3 rounded mb-2  flex gap-2">
            <div className="p-1">
              <RiHome8Line />
            </div>
            <span>Dashboard</span>
          </div>

        </nav>
      </div>
    </>
  )
}

export default Sidebar