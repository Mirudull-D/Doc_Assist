
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  lastVisit: { type: Date, required: true },
  risk: { type: String, required: true },
  conditions: { type: [String], required: true },
  vitals: { hr: String, bp: String, temp: String, resp: String },
  recentReports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
  medications: [{ name: String, dosage: String, frequency: String }],
}, {
  timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
