import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import PatientSkeleton from '../components/skeletons/PatientSkeleton';
import { Search, Plus, Eye, MoreVertical, User as UserIcon } from 'react-feather';

export default function Patients() {
  const {
    patients,
    patientsLoading,
    patientsError,
    fetchPatients,
  } = useStore();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <div data-aos="fade-up" className="space-y-6">
       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg sm:text-xl font-semibold">Patient Records</h2>
        <div className="flex gap-3">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700">
            <Plus className="mr-2" size={16} /> New Patient
          </button>
        </div>
      </div>

      {patientsError && <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">{patientsError}</div>}

      {/* Mobile card list */}
      <div className="grid sm:hidden gap-3">
        {patientsLoading ? (
          Array.from({ length: 5 }).map((_, i) => <PatientSkeleton key={i} />)
        ) : (
          patients.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <UserIcon size={16} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{p.name} · <span className="text-gray-500">ID: {p.id}</span></div>
                  <div className="text-sm text-gray-600">{p.age} · {p.gender} · Last: {p.lastVisit}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  p.risk === 'High' ? 'bg-red-100 text-red-800' :
                  p.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>{p.risk}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.conditions.map((c, i) => (
                  <span key={i} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{c}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age/Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conditions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patientsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-20 bg-gray-200 rounded-full"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  </tr>
                ))
              ) : (
                patients.map(patient => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <UserIcon size={16} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">ID: {patient.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.age}</div>
                      <div className="text-sm text-gray-500">{patient.gender}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.map((condition, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastVisit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.risk === 'High' ? 'bg-red-100 text-red-800' :
                        patient.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>{patient.risk} Risk</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3"><Eye size={16} /></button>
                      <button className="text-gray-600 hover:text-gray-900"><MoreVertical size={16} /></button>
                    </td>
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
