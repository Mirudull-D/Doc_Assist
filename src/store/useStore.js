import { create } from 'zustand';
import axios from 'axios';

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
      set({ patientsError: 'Failed to fetch patients.', patientsLoading: false, patients: [
        { id: 1, name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2023-06-15', risk: 'High', conditions: ['Hypertension', 'Diabetes'] },
        { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2023-06-14', risk: 'Medium', conditions: ['High Cholesterol'] },
      ] });
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
      set({ alertsError: 'Failed to fetch alerts.', alertsLoading: false, alerts: [
        { id: 1, patient: 'John Doe', risk: 'High', condition: 'Possible Kidney Dysfunction', date: '2023-06-15', probability: '85%' },
        { id: 2, patient: 'Jane Smith', risk: 'Medium', condition: 'Elevated Cholesterol', date: '2023-06-14', probability: '65%' },
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
      set({ uploading: false, uploadSuccess: true });
    } catch (error) {
      set({ uploading: false, uploadError: 'Upload failed. Please try again.' });
    }
  },
}));

export default useStore;
