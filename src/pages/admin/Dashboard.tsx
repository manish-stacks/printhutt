'use client'
import React, { useEffect, useState } from 'react'
import { RecentActivity } from '@/components/admin/dashboard/RecentActivity';
import { StatsCard } from '@/components/admin/dashboard/StatsCard';
// import { FaDollarSign, FaShoppingCart, FaUsers, FaBoxOpen, FaBlog } from 'react-icons/fa';
// import { RiTrademarkLine } from 'react-icons/ri';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Stat {
  title: string;
  value: number;
  icon: string;
}

interface RevenueData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

// interface Activity {
//   id: number;
//   description: string;
//   timestamp: string;
// }

const Dashboard = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData>({ labels: [], datasets: [] });
  //const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [sesstionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/dashboard');
        const data = res.data;
        setStats(data.stats);
        setRevenueData({
          labels: data.weeklyRevenue.labels,
          datasets: [
            {
              label: 'Weekly Revenue',
              data: data.weeklyRevenue.values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
        //setRecentActivity(data.recentActivity);
        setSessionData(data.sessionData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <>
      {/* <main className="pt-16 lg:pl-64"> */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="my-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">Welcome back, here&apos;s what&apos;s happening today.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.length > 0 ? (
            stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))
          ) : (

            <div className="skeleton-loader">Loading...</div>
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Revenue</h2>
            <div className="mt-4 h-[300px]">
              <Line data={revenueData} />
            </div>
          </div>
          <RecentActivity data={sesstionData} />
        </div>
      </div>
      {/* </main> */}
    </>
  )
}

export default Dashboard