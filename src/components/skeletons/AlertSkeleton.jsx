import React from 'react';

const AlertSkeleton = () => (
  <div className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="text-right">
        <div className="h-5 w-16 bg-gray-200 rounded-full mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
    <div className="mt-3 flex items-center">
      <div className="w-full bg-gray-200 rounded-full h-2"></div>
      <div className="ml-3 h-4 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

export default AlertSkeleton;
