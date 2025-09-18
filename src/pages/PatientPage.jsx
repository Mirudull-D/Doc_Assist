import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../store/useStore';
import PatientPageSkeleton from '../components/skeletons/PatientPageSkeleton';
import { User, Calendar, Droplet, Activity, FileText, Pill, ChevronRight } from 'react-feather';

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
                {patient.conditions.map((c, i) => (
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

      {/* Recent Reports */}
      {patient.recentReports && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Reports</h3>
                <Link to="/reports" className="text-blue-600 text-sm flex items-center">View All <ChevronRight size={16}/></Link>
            </div>
            <div className="space-y-3">
            {patient.recentReports.map(report => (
              <Link to={`/reports/${report.id}`} key={report.id} className="block p-4 rounded-lg hover:bg-gray-50 border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3"><FileText className="text-blue-600" size={16} /></div>
                        <div>
                            <p className="font-medium text-gray-800">{report.type}</p>
                            <p className="text-sm text-gray-500">{report.date}</p>
                        </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.risk === 'High' ? 'bg-red-100 text-red-800' :
                        report.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                    }`}>{report.risk} Risk</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Medications */}
      {patient.medications && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Current Medications</h3>
          <div className="divide-y divide-gray-200">
            {patient.medications.map((med, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3"><Pill className="text-green-600" size={16} /></div>
                    <div>
                        <p className="font-medium text-gray-800">{med.name}</p>
                        <p className="text-sm text-gray-500">{med.dosage} - {med.frequency}</p>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
