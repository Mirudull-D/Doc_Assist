
# Doc Assist Application Documentation

## 1. Website Overview

Doc Assist is a modern, AI-powered web application designed for healthcare professionals. It provides a centralized dashboard to monitor patients, view medical reports, and receive real-time, AI-driven alerts about potential health risks. The primary goal is to streamline patient management and enable proactive care.

### Key Features:
- **Patient Dashboard**: View a list of all patients with key information at a glance.
- **Detailed Patient View**: Drill down into a specific patient's profile to see their vitals, conditions, recent reports, and medications.
- **AI-Powered Alerts**: Get timely alerts for patients who may be at risk for certain conditions.
- **Report Management**: Upload and view patient reports seamlessly.

---

## 2. Frontend Application

The frontend is a single-page application built with React. It uses the `zustand` library for state management and `axios` for making API requests.

### Core Pages & Components:

*   **`Hero.jsx`**: The landing page for unauthenticated users. It features a clean interface with "Get Started" and "Sign Up" calls to action to guide user registration and login.
*   **`Dashboard.jsx`**: The main hub for logged-in users. It displays:
    *   A list of all patients.
    *   A feed of recent alerts.
    *   A summary of recent reports.
*   **`PatientPage.jsx`**: Provides a comprehensive view of a single patient, including their demographic data, medical history, vital signs, and a list of their recent reports and current medications.
*   **`UploadsPage.jsx`**: A dedicated page for uploading new patient reports. It features a drag-and-drop interface for ease of use.
*   **`useStore.js`**: The central state management store. It handles all interactions with the backend API, including fetching data, managing loading/error states, and handling file uploads.

---

## 3. Backend API Endpoints

The backend is a lightweight server built with Node.js and Express. It provides a set of RESTful API endpoints to serve data to the frontend.

### Base URL: `http://localhost:5000`

---

### Patients API

Manages patient data.

#### **`GET /patients`**
*   **Description**: Retrieves a list of all patients.
*   **Method**: `GET`
*   **Response**: `200 OK`
*   **Format**: An array of patient objects.
*   **Example Response Body**:
    ```json
    [
        {
            "id": 1,
            "name": "John Doe",
            "age": 45,
            "gender": "Male",
            "lastVisit": "2023-06-15",
            "risk": "High",
            "conditions": ["Hypertension", "Diabetes"]
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "age": 32,
            "gender": "Female",
            "lastVisit": "2023-06-14",
            "risk": "Medium",
            "conditions": ["High Cholesterol"]
        }
    ]
    ```

#### **`GET /patients/:id`**
*   **Description**: Retrieves a single patient by their unique ID.
*   **Method**: `GET`
*   **URL Params**: `id=[integer]` (required) - The ID of the patient.
*   **Response**: `200 OK` or `404 Not Found`
*   **Format**: A single patient object.
*   **Example Response Body**:
    ```json
    {
        "id": 1,
        "name": "John Doe",
        "age": 45,
        "gender": "Male",
        "lastVisit": "2023-06-15",
        "risk": "High",
        "conditions": ["Hypertension", "Diabetes"]
    }
    ```

#### **`POST /patients/upload`**
*   **Description**: Handles the upload of patient report files.
*   **Method**: `POST`
*   **Request Body**: `multipart/form-data`
    *   **Field**: `reports` - One or more files.
*   **Response**: `200 OK`
*   **Format**: A JSON object confirming the upload.
*   **Example Response Body**:
    ```json
    {
        "message": "Files uploaded successfully!"
    }
    ```
---

### Alerts API

Manages patient alerts.

#### **`GET /alerts`**
*   **Description**: Retrieves a list of all alerts.
*   **Method**: `GET`
*   **Response**: `200 OK`
*   **Format**: An array of alert objects.
*   **Example Response Body**:
    ```json
    [
        {
            "id": 1,
            "patientId": 1,
            "patient": "John Doe",
            "risk": "High",
            "condition": "Possible Kidney Dysfunction",
            "date": "2023-06-15",
            "probability": "85%"
        },
        {
            "id": 2,
            "patientId": 2,
            "patient": "Jane Smith",
            "risk": "Medium",
            "condition": "Elevated Cholesterol",
            "date": "2023-06-14",
            "probability": "65%"
        }
    ]
    ```

---

### Reports API

Manages patient reports.

#### **`GET /reports`**
*   **Description**: Retrieves a list of all reports.
*   **Method**: `GET`
*   **Response**: `200 OK`
*   **Format**: An array of report objects.
*   **Example Response Body**:
    ```json
    [
        {
            "id": 1,
            "patient": "John Doe",
            "type": "Blood Test",
            "date": "2023-06-15",
            "flagged": 3,
            "risk": "High"
        },
        {
            "id": 2,
            "patient": "Jane Smith",
            "type": "Lipid Profile",
            "date": "2023-06-14",
            "flagged": 2,
            "risk": "Medium"
        }
    ]
    ```
