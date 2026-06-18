# Clinic Queue Manager (Core Production Build)

> **Architecture Status:** Stable Production | **Deployment Environment:** Local Area Network Subnet (LAN-First) | **Compliance:** Structured Health Informatics Format

ClinicFlow is an optimized, micro-latency healthcare orchestration platform designed to handle high-velocity outpatient department (OPD) queue routing alongside a structured Electronic Health Records (EHR) compiler.

Engineered natively on a **Local-First, Distributed-Radio Data Protocol**, the system binds to the host machine's physical gateway interface (`0.0.0.0`). This guarantees 100% operational uptime for clinical spaces over standard local Wi-Fi router frames, rendering the clinic entirely immune to wide-area network (WAN) fiber broadband cutouts.

---

## 🚀 Core Architecture & Features

## 💎 Operational Module Matrix

### 🚀 1. Advanced Reception Intake Command Panel (`receptionist.html`)
* **Multi-Variant Ingestion Engine:** Structured data forms capturing primary informatics parameters (Name, Contact Link, Age, and Sex Identification vectors).
* **Triage Priority Overrides:** Binary boolean emergency flag mechanics sorting database queries instantly, allowing high-risk clinical targets to cleanly step into line sequence ahead of standard chronological token tracking.
* **Volatility Queue Buffering (Hold/Recall):** Safely isolates clinical "No-Shows" from the primary processing pipeline into a temporary holding record array without flushing ticket identification history metrics.
* **Thermal Slip Spooler:** Standard JavaScript layout printing subsystem executing instant local thermal token slips embedded with dynamic routing links.

### 👨‍⚕️ 2. Structured Clinical EHR Workspace (`doctor.html`)
* **Ergonomic Visual Skin:** Dark mode interface layout (Slate/Slate-900 color matrix) intentionally structured to mitigate ocular strain over prolonged clinician work shifts.
* **Discrete EHR Data Containers:** Independent Document Object Model (DOM) inputs decoupling Patient Demographics, Presenting Complaints, Vital Signs Matrix (`BP`, `Pulse Rate`, `Temperature`, `Body Mass Index`), Medication Formulation Plan, and Laboratory Testing Orders.
* **Clinical Presets Macro Library:** Fast-click text macro expansion triggers minimizing repetitive keystroke inputs for routine seasonal diagnoses (Viral syndromes, Gastrointestinal issues, Hypertension checkups).
* **Zero-Latency Hotkey Handlers:** Binding `Ctrl + Enter` to compile notes strings, fire real-time background WebSocket synchronization signals, clear memory form caches, and call the next sequential ticket in line within a singular runtime lifecycle block.

### 📱 3. Reactive Client Status Gateway (`patient.html`)
* **Anxiety Mitigation Interface:** Real-time mobile interface compiling position parameters (Tokens Remaining Ahead) and mathematical rolling consultation duration weights to formulate highly accurate live ETAs.
* **Real-Time Intercom Interceptors:** WebSockets state-mutation hooks tracking clinic wide delays or immediate call-inside priorities.
* **Secure Document Unlock:** Deliviers individual clinical summaries directly to the patient’s web-browser window immediately upon session compilation.

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

* **Receptionist Panel: http://<YOUR_LOCAL_IP>:5000/receptionist.html

* **Doctor Console: http://<YOUR_LOCAL_IP>:5000/doctor.html

* **Patient Portal Display: http://<YOUR_LOCAL_IP>:5000/patient.html?token=1

---

### Step 3: Push the Documentation to GitHub
Once you have created and saved the `README.md` file in your folder, run these commands in your terminal to sync it up to the cloud:

```bash
git add README.md
git commit -m "Docs: Added comprehensive README documentation"
git push origin main
