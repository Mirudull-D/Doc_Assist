import React from 'react'
import { Search, Plus, Eye, MoreVertical, User as UserIcon } from 'react-feather'

export default function Patients() {
  const patients = [
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2023-06-15', risk: 'High', conditions: ['Hypertension', 'Diabetes'] },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2023-06-14', risk: 'Medium', conditions: ['High Cholesterol'] },
    { id: 3, name: 'Robert Johnson', age: 58, gender: 'Male', lastVisit: '2023-06-10', risk: 'Low', conditions: ['Vitamin D Deficiency'] },
    { id: 4, name: 'Emily Davis', age: 28, gender: 'Female', lastVisit: '2023-06-08', risk: 'Medium', conditions: ['Anemia'] },
    { id: 5, name: 'Michael Brown', age: 50, gender: 'Male', lastVisit: '2023-06-05', risk: 'High', conditions: ['Diabetes', 'Kidney Disease'] },
  ]

  return (
    <div data-aos="fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Patient Records</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
            <Plus className="mr-2" size={16} /> New Patient
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conditions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map(patient => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.lastVisit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.risk === 'High' ? 'bg-red-100 text-red-800' :
                    patient.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {patient.risk} Risk
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Eye size={16} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
