import Image from 'next/image';
import React from 'react';


export function RecentActivity({ data }) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      <div className="mt-6 space-y-4">
        {data && data.map((activity, index) => (
          <div key={index} className="flex items-center gap-4">

            <Image
              src={activity?.productId?.thumbnail?.url}
              width={50}
              height={50}
              alt="Product"
              className="rounded h-8 w-8 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity?.productId?.title || "N/A"}</span> 
              </p>
              <p className="text-xs text-gray-500">{activity?.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}