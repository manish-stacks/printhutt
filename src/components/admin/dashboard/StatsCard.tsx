import React, { ElementType } from 'react';


interface StatsCardProps {
  title: string;
  value: string;
  trend: number;
  Icon: ElementType;
  color: string;
}

export function StatsCard({ title, value, trend, Icon, color }: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`rounded-full ${color} p-3`}>
          <i className={`${Icon} h-6 w-6 text-white`} ></i>
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-sm text-gray-600"> from last month</span>
      </div>
    </div>
  );
}