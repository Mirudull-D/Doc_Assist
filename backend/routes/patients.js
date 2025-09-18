const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

let patients = [
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2023-06-15', risk: 'High', conditions: ['Hypertension', 'Diabetes'] },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2023-06-14', risk: 'Medium', conditions: ['High Cholesterol'] },
];

router.route('/').get((req, res) => {
  res.json(patients);
});

router.route('/:id').get((req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) return res.status(404).send('The patient with the given ID was not found.');
  res.json(patient);
});

router.post('/upload', upload.array('reports'), (req, res) => {
    res.json({ message: 'Files uploaded successfully!' });
});

module.exports = router;
