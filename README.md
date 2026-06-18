# Clinic Queue Manager (Core Production Build)

> **Architecture Status:** Stable Production | **Deployment Environment:** Local Area Network Subnet (LAN-First) | **Compliance:** Structured Health Informatics Format

ClinicFlow is an optimized, micro-latency healthcare orchestration platform designed to handle high-velocity outpatient department (OPD) queue routing alongside a structured Electronic Health Records (EHR) compiler.

Engineered natively on a **Local-First, Distributed-Radio Data Protocol**, the system binds to the host machine's physical gateway interface (`0.0.0.0`). This guarantees 100% operational uptime for clinical spaces over standard local Wi-Fi router frames, rendering the clinic entirely immune to wide-area network (WAN) fiber broadband cutouts.

---

## 🚀 Core Architecture & Features

### 🖥️ 1. Comprehensive Reception Intake (`receptionist.html`)
* **Rapid Entry Form:** Captures vital demographics (Name, Mobile, Age, and Gender) in under 5 seconds.
* **Emergency Triage Trigger:** Bypasses normal token increments to automatically route critical or senior patients straight to the top of the waitlist.
* **Smart Buffering (Hold/Recall):** "Park" absent no-show patients cleanly to the side without flushing their token history, and recall them instantly when they step back into the clinic.
* **Thermal Slip Printing Engine:** Generates instant browser-level printable tokens containing dynamic tracking parameters.
* **Live Broadcast Warnings:** Allows the front desk to notify all waiting patients simultaneously of general scheduling delays (e.g., during emergency delays).

### 👨‍⚕️ 2. Elite Doctor EHR Console (`doctor.html`)
* **Ergonomic Design:** Clean, eye-strain-reducing dark interface designed for full-shift medical usage.
* **Structured Data Entry:** Segregated entry cards for Demographics, Complaints/Symptoms, Vital Metrics (BP, Pulse, Temp, Weight), Prescribed Medications, and Laboratory Diagnostics.
* **Clinical Presets & Shortcuts:** Clickable medical macros for seasonal cases (Flu, Acidity, Hypertension) to minimize manual typing.
* **Zero-Mouse Workflow:** Hit `Ctrl + Enter` to instantly log the case history, push data out to the patient, clear inputs, and call the next sequential ticket.
* **Silent Intercom Panic Alarm:** Instant distress button that fires flashing alerts directly onto the receptionist's screen.
* **Print Engine:** Generates pristine, neatly formatted, physical printouts for patients requiring paper slips for local pharmacies or insurance claims.

### 📱 3. Live Patient Tracker (`patient.html`)
* **Anxiety Reducer:** Patients track dynamic metrics straight on their smartphones (Tokens remaining ahead, changing wait times based on historical consultation averages).
* **Automatic Notification Broadcasts:** Screens turn live-green when called inside, flash warning bars during delays, and unlock a secure **Digital Medical Summary Report** immediately after the checkup is finalized.

---

## 🛠️ Technology Stack
* **Frontend:** Vanilla HTML5, CSS3 (Modern Flexbox/Grid systems), JavaScript (ES6+), Web Speech API.
* **Backend:** Node.js, Express.js.
* **Real-time Pipeline:** Socket.io (Bi-directional WebSocket engine).
* **Database Ledger:** MongoDB via Mongoose ODM wrappers.
* **Network Blueprint:** Network-bind interface broadcasting on `0.0.0.0` for local subnet wireless configurations.

---

## 💻 Local Network Deployment Guide

To run this platform completely offline inside a clinic using a local Wi-Fi router (No active internet connection required):

### Prerequisites
1. Install [Node.js](https://nodejs.org/) on the main host computer (e.g., the receptionist's desktop).
2. Ensure [MongoDB](https://www.mongodb.com/try/download/community) is installed and running locally on port `27017`.

### Installation Steps
1. Clone this repository or download the project files.
2. Open your terminal in the root folder and install the dependencies:
   ```bash
   npm install express socket.io mongoose cors
3. Boot the application engine:
    ```bash
      node server.js

## Accessing the Panels
Upon booting, the console terminal will extract your machine's local router IPv4 address and print your operational links:

* Receptionist Panel: http://<YOUR_LOCAL_IP>:5000/receptionist.html

* Doctor Console: http://<YOUR_LOCAL_IP>:5000/doctor.html

* Patient Portal Display: http://<YOUR_LOCAL_IP>:5000/patient.html?token=1

---

### Step 3: Push the Documentation to GitHub
Once you have created and saved the `README.md` file in your folder, run these commands in your terminal to sync it up to the cloud:

```bash
git add README.md
git commit -m "Docs: Added comprehensive README documentation"
git push origin main
