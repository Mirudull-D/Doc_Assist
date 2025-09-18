import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../store/useStore';
import PatientPageSkeleton from '../components/skeletons/PatientPageSkeleton';
import { User, Calendar, Droplet, Activity, FileText, Tablet, ChevronRight } from 'react-feather';

const InfoCard = ({ title, value, icon: Icon }) => (
  <div>
    <div className="text-sm text-gray-500 flex items-center"><Icon size={14} className="mr-2"/>{title}</div>
    <div className="font-bold text-lg">{value}</div>
  </div>
);

const VitalCard = ({ title, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg text-center">
    <div className="font-medium text-gray-700">{title}</div>
    <div className="text-xl font-bold text-blue-600">{value}</div>
  </div>
);

export default function PatientPage() {
  const { id } = useParams();
  const { patient, patientLoading, fetchPatient } = useStore();

  useEffect(() => {
    fetchPatient(id);
  }, [id, fetchPatient]);

  if (patientLoading) {
    return <PatientPageSkeleton />;
  }

  if (!patient) {
    return <div className="text-center text-red-500">Could not load patient data.</div>;
  }

  return (
    <div data-aos="fade-up" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Patient Details</h2>
        <div className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
          patient.risk === 'High' ? 'bg-red-100 text-red-800' :
          patient.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>{patient.risk} Risk</div>
      </div>

      {/* Patient Info */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <InfoCard title="Patient Name" value={patient.name} icon={User} />
          <InfoCard title="Age" value={patient.age} icon={Calendar} />
          <InfoCard title="Gender" value={patient.gender} icon={Droplet} />
          <InfoCard title="Last Visit" value={patient.lastVisit} icon={Calendar} />
        </div>
        <div className="mt-6">
            <div className="text-sm text-gray-500 flex items-center mb-2"><Activity size={14} className="mr-2"/>Conditions</div>
            <div className="flex flex-wrap gap-2">
                {Array.isArray(patient.conditions) && patient.conditions.map((c, i) => (
                    <span key={i} className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800">{c}</span>
                ))}
            </div>
        </div>
      </div>

      {/* Vitals */}
      {patient.vitals && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Vitals</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <VitalCard title="Heart Rate" value={patient.vitals.hr} />
            <VitalCard title="Blood Pressure" value={patient.vitals.bp} />
            <VitalCard title="Temperature" value={patient.vitals.temp} />
            <VitalCard title="Respiration" value={patient.vitals.resp} />
          </div>
        </div>
      )}

      {/* Medications Table */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Medications</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patient.medications?.map((med, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap">{med.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{med.dosage}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{med.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Appointments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patient.appointments?.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap">{appt.date}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{appt.time}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{appt.reason}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{appt.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
