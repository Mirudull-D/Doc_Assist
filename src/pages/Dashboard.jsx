import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import AlertSkeleton from '../components/skeletons/AlertSkeleton';
import { TrendingUp, TrendingDown } from 'react-feather';

export default function Dashboard() {
  const {
    alerts,
    alertsLoading,
    alertsError,
    fetchAlerts,
  } = useStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const stats = [
    { name: 'Total Patients', value: '142', icon: 'users', change: '+12%', trend: 'up' },
    { name: 'Reports Analyzed', value: '327', icon: 'file-text', change: '+23%', trend: 'up' },
    { name: 'Critical Alerts', value: '18', icon: 'alert-triangle', change: '-5%', trend: 'down' },
    { name: 'Avg. Processing Time', value: '2.4s', icon: 'clock', change: '-1.2s', trend: 'down' },
  ];

  return (
    <div data-aos="fade-up" className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.trend === 'up' ? <TrendingUp size={18}/> : <TrendingDown size={18}/>}
              </div>
            </div>
            <p className={`text-sm mt-3 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend === 'up' ? <TrendingUp className="inline mr-1" size={14}/> : <TrendingDown className="inline mr-1" size={14}/>}
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Alerts</h3>
          <button className="text-blue-600 text-sm flex items-center">
            View All
          </button>
        </div>
        {alertsError && <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">{alertsError}</div>}
        <div className="space-y-4">
          {alertsLoading ? (
            Array.from({ length: 3 }).map((_, i) => <AlertSkeleton key={i} />)
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg border ${alert.risk === 'High' ? 'risk-high' : alert.risk === 'Medium' ? 'risk-medium' : 'risk-low'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{alert.patient}</h4>
                    <p className="text-sm mt-1">{alert.condition}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${alert.risk === 'High' ? 'bg-red-100 text-red-800' : alert.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {alert.risk} Risk
                    </span>
                    <p className="text-sm mt-1">{alert.date}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${alert.risk === 'High' ? 'bg-red-500' : alert.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: alert.probability }}
                    />
                  </div>
                  <span className="ml-3 text-sm font-medium">{alert.probability} confidence</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Analytics Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Common Conditions</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">Chart would display here</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">Pie chart would display here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
