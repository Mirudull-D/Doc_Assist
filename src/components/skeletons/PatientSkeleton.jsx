import React from 'react';

const PatientSkeleton = () => (
  <div className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gray-200" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mt-1" />
      </div>
      <div className="h-5 w-16 bg-gray-200 rounded-full" />
    </div>
  </div>
);

export default PatientSkeleton;
