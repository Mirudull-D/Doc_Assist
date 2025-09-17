// src/pages/Reports.jsx
import React from "react";
import { Search, Download, Eye } from "react-feather";

export default function Reports() {
  const reports = [
    {
      id: 1,
      patient: "John Doe",
      type: "Blood Test",
      date: "2023-06-15",
      flagged: 3,
      risk: "High",
    },
    {
      id: 2,
      patient: "Jane Smith",
      type: "Lipid Profile",
      date: "2023-06-14",
      flagged: 2,
      risk: "Medium",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      type: "Vitamin Panel",
      date: "2023-06-10",
      flagged: 1,
      risk: "Low",
    },
    {
      id: 4,
      patient: "Emily Davis",
      type: "CBC",
      date: "2023-06-08",
      flagged: 2,
      risk: "Medium",
    },
    {
      id: 5,
      patient: "Michael Brown",
      type: "Renal Function",
      date: "2023-06-05",
      flagged: 4,
      risk: "High",
    },
  ];

  return (
    <div data-aos="fade-up" className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg sm:text-xl font-semibold">Report Analysis</h2>
        <div className="flex gap-3">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
          </div>
          <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Types</option>
            <option>Blood Test</option>
            <option>Lipid Profile</option>
            <option>Vitamin Panel</option>
          </select>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="grid sm:hidden gap-3">
        {reports.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow-sm border border-gray-700 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium">
                  #{r.id} · {r.patient}
                </div>
                <div className="text-sm text-gray-600">
                  {r.type} · {r.date}
                </div>
                <div className="mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.risk === "High"
                        ? "bg-red-100 text-red-800"
                        : r.risk === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {r.risk} Risk
                  </span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      r.flagged > 2
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {r.flagged} flagged
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye size={16} />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Report ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Flagged Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{report.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {report.patient}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.flagged > 2
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {report.flagged} flagged
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.risk === "High"
                          ? "bg-red-100 text-red-800"
                          : report.risk === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {report.risk} Risk
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
