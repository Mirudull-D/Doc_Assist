import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import ReportSkeleton from '../components/skeletons/ReportSkeleton';
import { Search, Download, Eye } from 'react-feather';

export default function Reports() {
  const {
    reports,
    reportsLoading,
    fetchReports,
  } = useStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div data-aos="fade-up" className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg sm:text-xl font-semibold">Report Analysis</h2>
        <div className="flex gap-3">
           <div className="relative flex-1 sm:flex-none">
             <input type="text" placeholder="Search reports..." className="w-full pl-10 pr-4 py-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
           </div>
           <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
             <option>All Types</option>
             <option>Blood Test</option>
             <option>Lipid Profile</option>
           </select>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="grid sm:hidden gap-3">
        {reportsLoading ? (
          Array.from({ length: 5 }).map((_, i) => <ReportSkeleton key={i} />)
        ) : (
          reports.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-700 p-4">
              {/* ... report card content ... */}
            </div>
          ))
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flagged Items</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-24 bg-gray-200 rounded-full"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-20 bg-gray-200 rounded-full"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  </tr>
                ))
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{report.patient}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-medium ${ report.flagged > 2 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800' }`}>{report.flagged} flagged</span></td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-medium ${ report.risk === 'High' ? 'bg-red-100 text-red-800' : report.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800' }`}>{report.risk} Risk</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><button className="text-blue-600 hover:text-blue-900 mr-3"><Eye size={16} /></button><button className="text-gray-600 hover:text-gray-900"><Download size={16} /></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
