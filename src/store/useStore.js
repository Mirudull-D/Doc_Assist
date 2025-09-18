import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const useStore = create((set) => ({
  // Patients State
  patients: [],
  patientsLoading: true,
  patientsError: null,
  fetchPatients: async () => {
    set({ patientsLoading: true, patientsError: null });
    try {
      const response = await axios.get('http://localhost:5000/patients');
      if (Array.isArray(response.data)) {
        set({ patients: response.data, patientsLoading: false });
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      toast.error('Failed to fetch patients.');
      set({ patientsError: 'Failed to fetch patients.', patientsLoading: false, patients: [] });
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
      toast.error('Failed to fetch patient data.');
      set({ patientError: 'Failed to fetch patient data.', patientLoading: false, patient: null });
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
      if (Array.isArray(response.data)) {
        set({ alerts: response.data, alertsLoading: false });
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      toast.error('Failed to fetch alerts.');
      set({ alertsError: 'Failed to fetch alerts.', alertsLoading: false, alerts: [] });
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
      if (Array.isArray(response.data)) {
        set({ reports: response.data, reportsLoading: false });
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      toast.error('Failed to fetch reports.');
      set({ reportsError: 'Failed to fetch reports.', reportsLoading: false, reports: [] });
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
