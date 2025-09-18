import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

// Mock data for a single patient
const singlePatientMock = {
  id: 1,
  name: 'John Doe',
  age: 45,
  gender: 'Male',
  lastVisit: '2023-06-15',
  risk: 'High',
  conditions: ['Hypertension', 'Diabetes'],
  vitals: {
    hr: '85 bpm',
    bp: '140/90 mmHg',
    temp: '98.6°F',
    resp: '18 bpm',
  },
  recentReports: [
    { id: 1, type: 'Blood Test', date: '2023-06-15', flagged: 3, risk: 'High' },
    { id: 3, type: 'Urinalysis', date: '2023-05-20', flagged: 1, risk: 'Low' },
  ],
  medications: [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice a day' },
  ]
};


const useStore = create((set) => ({
  // Patients State
  patients: [],
  patientsLoading: true,
  patientsError: null,
  fetchPatients: async () => {
    set({ patientsLoading: true, patientsError: null });
    try {
      const response = await axios.get('/api/patients');
      if (Array.isArray(response.data)) {
        set({ patients: response.data, patientsLoading: false });
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      toast.error('Failed to fetch patients.');
      set({ patientsError: 'Failed to fetch patients.', patientsLoading: false, patients: [
        { id: 1, name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2023-06-15', risk: 'High', conditions: ['Hypertension', 'Diabetes'] },
        { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2023-06-14', risk: 'Medium', conditions: ['High Cholesterol'] },
      ] });
    }
  },

  // Single Patient State
  patient: null,
  patientLoading: true,
  patientError: null,
  fetchPatient: async (id) => {
    set({ patientLoading: true, patientError: null });
    try {
      // In a real app, you'd fetch /api/patients/${id}
      const response = await axios.get(`/api/patients/${id}`); 
      set({ patient: response.data, patientLoading: false });
    } catch (error) {
      toast.error('Failed to fetch patient data.');
      // Fallback to mock data on error
      set({ patientError: 'Failed to fetch patient data.', patientLoading: false, patient: singlePatientMock });
    }
  },

  // Alerts State
  alerts: [],
  alertsLoading: true,
  alertsError: null,
  fetchAlerts: async () => {
    set({ alertsLoading: true, alertsError: null });
    try {
      const response = await axios.get('/api/alerts');
      if (Array.isArray(response.data)) {
        set({ alerts: response.data, alertsLoading: false });
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      toast.error('Failed to fetch alerts.');
      set({ alertsError: 'Failed to fetch alerts.', alertsLoading: false, alerts: [
        { id: 1, patientId: 1, patient: 'John Doe', risk: 'High', condition: 'Possible Kidney Dysfunction', date: '2023-06-15', probability: '85%' },
        { id: 2, patientId: 2, patient: 'Jane Smith', risk: 'Medium', condition: 'Elevated Cholesterol', date: '2023-06-14', probability: '65%' },
      ] });
    }
  },

  // Reports State
  reports: [],
  reportsLoading: true,
  reportsError: null,
  fetchReports: async () => {
    set({ reportsLoading: true, reportsError: null });
    try {
      const response = await axios.get('/api/reports');
      if (Array.isArray(response.data)) {
        set({ reports: response.data, reportsLoading: false });
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      toast.error('Failed to fetch reports.');
      set({ reportsError: 'Failed to fetch reports.', reportsLoading: false, reports: [
        { id: 1, patient: "John Doe", type: "Blood Test", date: "2023-06-15", flagged: 3, risk: "High" },
        { id: 2, patient: "Jane Smith", type: "Lipid Profile", date: "2023-06-14", flagged: 2, risk: "Medium" },
      ] });
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
      await axios.post('/api/upload', formData, {
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
