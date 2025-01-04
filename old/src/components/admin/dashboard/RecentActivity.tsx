import React from 'react';

const activities = [
  {
    user: 'John Doe',
    action: 'created a new post',
    time: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
  },
  {
    user: 'Sarah Smith',
    action: 'updated their profile',
    time: '4 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces',
  },
  {
    user: 'Mike Johnson',
    action: 'completed a task',
    time: '6 hours ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces',
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      <div className="mt-6 space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              src={activity.avatar}
              alt={activity.user}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}