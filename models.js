const mongoose = require('mongoose');

const ClinicSchema = new mongoose.Schema({
  id: { type: String, default: "main_clinic" },
  currentToken: { type: Number, default: 0 },
  avgConsultationTime: { type: Number, default: 10 } 
});

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  tokenNumber: { type: Number, required: true },
  status: { type: String, enum: ['waiting', 'serving', 'completed', 'held'], default: 'waiting' },
  isPriority: { type: Boolean, default: false }, // Emergency priority flag
  
  // NEW FIELDS FOR DEMOGRAPHICS
  age: { type: Number },
  gender: { type: String },
  
  clinicalNotes: { type: String, default: "" }, 
  createdAt: { type: Date, default: Date.now },
  endedAt: { type: Date } 
});

const Clinic = mongoose.model('Clinic', ClinicSchema);
const Patient = mongoose.model('Patient', PatientSchema);

module.exports = { Clinic, Patient };