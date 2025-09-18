import React from 'react';

const ReportSkeleton = () => (
  <div className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
        <div className="mt-2 flex gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export default ReportSkeleton;
