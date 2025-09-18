import React from 'react';

const PatientPageSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>

      {/* Patient Info */}
      <div className="p-6 bg-white rounded-xl shadow-sm border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Vitals */}
      <div className="p-6 bg-white rounded-xl shadow-sm border">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="p-6 bg-white rounded-xl shadow-sm border">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div className="p-6 bg-white rounded-xl shadow-sm border">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientPageSkeleton;
