const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const patientsRouter = require('./routes/patients');
app.use('/patients', patientsRouter);

const alerts = [
    { id: 1, patientId: 1, patient: 'John Doe', risk: 'High', condition: 'Possible Kidney Dysfunction', date: '2023-06-15', probability: '85%' },
    { id: 2, patientId: 2, patient: 'Jane Smith', risk: 'Medium', condition: 'Elevated Cholesterol', date: '2023-06-14', probability: '65%' },
];

const reports = [
    { id: 1, patient: "John Doe", type: "Blood Test", date: "2023-06-15", flagged: 3, risk: "High" },
    { id: 2, patient: "Jane Smith", type: "Lipid Profile", date: "2023-06-14", flagged: 2, risk: "Medium" },
];

app.get('/alerts', (req, res) => {
  res.json(alerts);
});

app.get('/reports', (req, res) => {
  res.json(reports);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
