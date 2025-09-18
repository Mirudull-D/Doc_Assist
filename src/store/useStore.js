import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

// Mock Data
const mockPatients = [
    {
        id: 1,
        name: 'John Doe',
        age: 45,
        gender: 'Male',
        lastVisit: '2023-06-15',
        risk: 'High',
        conditions: ['Hypertension', 'Diabetes'],
        dob: '1979-05-20',
        contact: {
            phone: '555-0101',
            email: 'john.doe@example.com'
        },
        address: '123 Maple Street, Springfield, IL, 62704',
        vitals: {
            hr: "60",
            bp: "140/90",
            temp: "98.6",
            resp: "16",
        },
        medications: [
            { name: 'Metformin', dosage: '500mg', frequency: 'Twice a day' },
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day' },
        ],
        appointments: [
            { id: 1, date: '2023-08-15', time: '10:00 AM', reason: 'Follow-up', doctor: 'Dr. Smith' },
            { id: 2, date: '2023-07-20', time: '2:30 PM', reason: 'Annual Check-up', doctor: 'Dr. Smith' }
        ]
    },
    {
        id: 2,
        name: 'Jane Smith',
        age: 32,
        gender: 'Female',
        lastVisit: '2023-06-14',
        risk: 'Medium',
        conditions: ['High Cholesterol'],
        dob: '1992-11-30',
        contact: {
            phone: '555-0102',
            email: 'jane.smith@example.com'
        },
        address: '456 Oak Avenue, Springfield, IL, 62704',
        vitals: {
            hr: "75",
            bp: "120/80",
            temp: "98.7",
            resp: "18",
        },
        medications: [
            { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once a day' },
        ],
        appointments: [
            { id: 1, date: '2023-09-01', time: '11:00 AM', reason: 'Routine Check-up', doctor: 'Dr. Jones' }
        ]
    },
];
const mockAlerts = [];
const mockReports = [
    { id: 1, patientId: 1, patient: "John Doe", type: "Blood Test", date: "2023-06-15", flagged: 3, risk: "High" },
    { id: 2, patientId: 2, patient: "Jane Smith", type: "Lipid Profile", date: "2023-06-14", flagged: 2, risk: "Medium" },
    { id: 3, patientId: 1, patient: "John Doe", type: "Urinalysis", date: "2023-05-20", flagged: 1, risk: "Medium" },
];

const useStore = create((set) => ({
  // Patients State
  patients: [],
  patientsLoading: true,
  patientsError: null,
  fetchPatients: async () => {
    set({ patientsLoading: true, patientsError: null });
    try {
      const response = await axios.get('http://localhost:5000/patients');
      set({ patients: response.data, patientsLoading: false });
    } catch (error) {
      toast.error('Failed to fetch patients. Using mock data.');
      set({ patientsError: 'Failed to fetch patients.', patientsLoading: false, patients: mockPatients });
    }
  },

  // Single Patient State
  patient: null,
  patientLoading: true,
  patientError: null,
  fetchPatient: async (id) => {
    set({ patientLoading: true, patientError: null });
    try {
      const response = await axios.get(`http://localhost:5000/patients/${id}`); 
      set({ patient: response.data, patientLoading: false });
    } catch (error) {
      toast.error('Failed to fetch patient data. Using mock data.');
      const mockPatient = mockPatients.find(p => p.id.toString() === id);
      set({ patientError: 'Failed to fetch patient data.', patientLoading: false, patient: mockPatient });
    }
  },

  // Alerts State
  alerts: [],
  alertsLoading: true,
  alertsError: null,
  fetchAlerts: async () => {
    set({ alertsLoading: true, alertsError: null });
    try {
      const response = await axios.get('http://localhost:5000/alerts');
      set({ alerts: response.data, alertsLoading: false });
    } catch (error) {
      toast.error('Failed to fetch alerts. Using mock data.');
      set({ alertsError: 'Failed to fetch alerts.', alertsLoading: false, alerts: mockAlerts });
    }
  },

  // Reports State
  reports: [],
  reportsLoading: true,
  reportsError: null,
  fetchReports: async () => {
    set({ reportsLoading: true, reportsError: null });
    try {
      const response = await axios.get('http://localhost:5000/reports');
      set({ reports: response.data, reportsLoading: false });
    } catch (error) {
      toast.error('Failed to fetch reports. Using mock data.');
      set({ reportsError: 'Failed to fetch reports.', reportsLoading: false, reports: mockReports });
    }
  },

  // Upload State
  uploading: false,
  uploadError: null,
  uploadSuccess: false,
  uploadFiles: async (files) => {
    set({ uploading: true, uploadError: null, uploadSuccess: false });
    const formData = new FormData();
    files.forEach(file => {
      formData.append('reports', file);
    });
    try {
      await axios.post('http://localhost:5000/patients/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Files uploaded successfully!');
      set({ uploading: false, uploadSuccess: true });
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      set({ uploading: false, uploadError: 'Upload failed. Please try again.' });
    }
  },
}));

export default useStore;
