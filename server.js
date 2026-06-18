const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const os = require('os');
const { Clinic, Patient } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves all dashboard HTML screens from the public folder

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// --- MONGODB CORE CONNECTION ---
mongoose.connect('mongodb://localhost:27017/clinicQueue')
  .then(() => console.log('MongoDB Infrastructure Active'))
  .catch(err => console.error('Database Connectivity Failure:', err));

// Auto-initialize baseline clinic data structure if collections are fresh
async function initClinic() {
  const exists = await Clinic.findOne({ id: "main_clinic" });
  if (!exists) {
    await Clinic.create({ id: "main_clinic", currentToken: 0, avgConsultationTime: 10 });
    console.log('Clinic Ledger Blueprint Instantiated.');
  }
}
initClinic();

// --- AUTOMATED MIDNIGHT LEDGER ROTATION CRON ---
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    console.log("⏰ Midnight structural ledger rotation active. Auto-flushing database collections...");
    Patient.deleteMany({}).then(() => {
      Clinic.updateOne({ id: "main_clinic" }, { currentToken: 0, avgConsultationTime: 10 });
      io.emit('queue-updated');
    }).catch(err => console.error("Cron wipe execution failure:", err));
  }
}, 60000);

// --- OUTBOUND WHATSAPP PROXY SYSTEM ---
async function sendWhatsAppAlert(phoneNumber, message) {
  if (!phoneNumber || phoneNumber.trim() === "") return;
  
  console.log(`\n--- [OUTBOUND WHATSAPP CHANNEL] ---`);
  console.log(`To: ${phoneNumber}`);
  console.log(`Message: ${message.substring(0, 75)}...`);
  console.log(`------------------------------------\n`);
}

// --- QUEUE SYSTEM WEBSOCKET ROUTING PIPELINE ---
io.on('connection', (socket) => {
  console.log('A console monitoring node linked into WebSockets.');

  // Handle emergency silent panic signals coming out of the doctor's cabin
  socket.on('panic-signal-triggered', (data) => {
    console.log(`⚠️ ALARM: Panic trigger received from ${data.room}`);
    io.emit('reception-panic-flash', data);
  });

  // FEATURE UPGRADE MODULE: Intercepts delay broadcasts from reception and pushes them out to patients
  socket.on('broadcast-delay-signal', (data) => {
    console.log(`⏳ DELAY SIGNAL RECEIVED: Receptionist broadcasted a ${data.minutes}-minute delay alert.`);
    io.emit('patient-delay-alert', { minutes: data.minutes });
  });
});

// --- API ENDPOINTS ---

/**
 * FEATURE UPGRADE MODULE: LIVE BUSINESS INTELLIGENCE METRICS
 * Gathers operational clinic insights instantly for analytics processing
 */
app.get('/api/queue-analytics', async (req, res) => {
  try {
    const totalRegistered = await Patient.countDocuments({});
    const completedCases = await Patient.countDocuments({ status: 'completed' });
    const missedAppointments = await Patient.countDocuments({ status: 'held' });
    const emergencyTriages = await Patient.countDocuments({ isPriority: true });
    
    // Calculates completed prescriptions issued based on documented diagnostics data sets
    const completedPrescriptions = await Patient.countDocuments({ clinicalNotes: { $ne: "" } });

    res.json({
      summary: {
        totalRegistrationsToday: totalRegistered,
        successfulCheckupsCompleted: completedCases,
        patientsLeftOnHold: missedAppointments,
        emergencyTriagesBypassed: emergencyTriages,
        digitalPrescriptionsIssued: completedPrescriptions
      },
      systemHealth: "OK",
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 1. GET FULL SYSTEM SNAPSHOT
 */
app.get('/api/queue-state', async (req, res) => {
  try {
    const clinic = await Clinic.findOne({ id: "main_clinic" });
    const waitingPatients = await Patient.find({ status: 'waiting' }).sort({ isPriority: -1, tokenNumber: 1 });
    const heldPatients = await Patient.find({ status: 'held' }).sort({ tokenNumber: 1 });
    res.json({ clinic, waitingPatients, heldPatients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 2. GET TARGETED PATIENT METRICS
 */
app.get('/api/patient/details/:token', async (req, res) => {
  try {
    const patient = await Patient.findOne({ tokenNumber: parseInt(req.params.token) });
    res.json(patient || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 3. RAPID INTAKE PATIENT ENTRY
 */
app.post('/api/patient/add', async (req, res) => {
  try {
    const lastPatient = await Patient.findOne().sort({ tokenNumber: -1 });
    const nextToken = lastPatient ? lastPatient.tokenNumber + 1 : 1;
    const phoneNum = req.body.phone || "9876543210"; 

    const newPatient = await Patient.create({
      name: req.body.name,
      phone: phoneNum,
      tokenNumber: nextToken,
      status: 'waiting',
      isPriority: req.body.isPriority || false,
      age: req.body.age ? parseInt(req.body.age) : undefined,
      gender: req.body.gender || undefined
    });

    const customLink = `http://localhost:5000/patient.html?token=${nextToken}`;
    const customMessage = `Namaste ${newPatient.name}, your Token Number is ${nextToken}. Monitor live waiting room velocity on your phone here: ${customLink}`;
    sendWhatsAppAlert(newPatient.phone, customMessage).catch(err => console.error(err));

    io.emit('queue-updated');
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 4. CALL NEXT PATIENT
 */
app.post('/api/queue/next', async (req, res) => {
  try {
    const clinic = await Clinic.findOne({ id: "main_clinic" });
    const now = new Date();

    await Patient.updateOne(
      { tokenNumber: clinic.currentToken, status: 'serving' },
      { status: 'completed', endedAt: now }
    );

    const recentCompleted = await Patient.find({ status: 'completed' }).sort({ endedAt: -1 }).limit(5);

    if (recentCompleted.length > 1) {
      let totalDurations = 0;
      for (let i = 0; i < recentCompleted.length - 1; i++) {
        const diffMs = recentCompleted[i].endedAt - recentCompleted[i + 1].endedAt;
        totalDurations += diffMs / (1000 * 60);
      }
      const calculatedAvg = Math.round(totalDurations / (recentCompleted.length - 1));
      clinic.avgConsultationTime = calculatedAvg > 0 ? calculatedAvg : 4;
    }

    const nextPatient = await Patient.findOne({ status: 'waiting' }).sort({ isPriority: -1, tokenNumber: 1 });
    
    if (nextPatient) {
      clinic.currentToken = nextPatient.tokenNumber;
      nextPatient.status = 'serving';
      await nextPatient.save();
    } else {
      clinic.currentToken = 0;
    }

    await clinic.save();
    io.emit('queue-updated');
    res.json({ success: true, currentToken: clinic.currentToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 5. PARK NO-SHOW CLIENTS INTO HOLD ISOLATION
 */
app.post('/api/queue/hold', async (req, res) => {
  try {
    const clinic = await Clinic.findOne({ id: "main_clinic" });
    await Patient.updateOne({ tokenNumber: clinic.currentToken, status: 'serving' }, { status: 'held' });

    const nextPatient = await Patient.findOne({ status: 'waiting' }).sort({ isPriority: -1, tokenNumber: 1 });
    if (nextPatient) {
      clinic.currentToken = nextPatient.tokenNumber;
      nextPatient.status = 'serving';
      await nextPatient.save();
    } else {
      clinic.currentToken = 0;
    }

    await clinic.save();
    io.emit('queue-updated');
    res.json({ success: true, currentToken: clinic.currentToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 6. RECALL HELD PATIENTS TO DOCTOR'S CABIN
 */
app.post('/api/queue/recall', async (req, res) => {
  try {
    const { tokenNumber } = req.body;
    const clinic = await Clinic.findOne({ id: "main_clinic" });
    const now = new Date();

    if (clinic.currentToken > 0) {
      await Patient.updateOne(
        { tokenNumber: clinic.currentToken, status: 'serving' },
        { status: 'completed', endedAt: now }
      );
    }

    await Patient.updateOne({ tokenNumber: tokenNumber }, { status: 'serving' });

    clinic.currentToken = tokenNumber;
    await clinic.save();

    io.emit('queue-updated');
    res.json({ success: true, currentToken: clinic.currentToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 7. RECORD MEDICAL PRESCRIPTION HISTORY
 */
app.post('/api/queue/complete-active', async (req, res) => {
  try {
    const clinic = await Clinic.findOne({ id: "main_clinic" });
    await Patient.updateOne(
      { tokenNumber: clinic.currentToken },
      { clinicalNotes: req.body.notes }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 8. SYSTEM DATA PURGE ROUTE
 */
app.get('/api/queue/reset', async (req, res) => {
  try {
    await Patient.deleteMany({});
    await Clinic.updateOne({ id: "main_clinic" }, { currentToken: 0, avgConsultationTime: 10 });
    
    io.emit('queue-updated');
    res.json({ success: true, message: "Ledger structures flushed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- INDESTRUCTIBLE LOCAL NETWORK OFFLINE FALLBACK ENGINE ---
const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  const interfaces = os.networkInterfaces();
  let LANAddress = 'localhost';
  
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && !alias.internal) {
        LANAddress = alias.address;
      }
    }
  }
  
  console.log(`\n=============================================================`);
  console.log(`🚀 CLINIC FLOW LOCAL NETWORK SYSTEM DEPLOYED`);
  console.log(`=============================================================`);
  console.log(`🖥️  Receptionist Panel:  http://${LANAddress}:${PORT}/receptionist.html`);
  console.log(`👨‍⚕️  Doctor Panel:        http://${LANAddress}:${PORT}/doctor.html`);
  console.log(`📱  Patient Live View:   http://${LANAddress}:${PORT}/patient.html`);
  console.log(`=============================================================\n`);
});