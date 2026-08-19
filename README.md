# Appliance Energy Profiler ⚡ (CSE407 Midterm Project)

An interactive, real-time energy profiling dashboard for home appliances (specifically tested with a Deep Freezer). This project was built for **CSE407 (Green Computing)** to monitor instantaneous power draw, cumulative energy usage (kWh), operating costs, and device switch control using the **Tuya Smart Home Cloud API** and **MongoDB Atlas**.

---

## 📋 Features

- **Live Metrics Dashboard**: Real-time display of Voltage (V), Current (A), Power (W), and Hourly operating cost in BDT.
- **Interactive Control**: Toggle the appliance on/off directly from the dashboard.
- **Real-Time Visual Trends**: Instantaneous active power draw line chart.
- **Energy Consumption Log**: Cumulative energy consumption bar chart (updated in 3-second slices).
- **Analytics & Projections**: Calculates peak/average draw, total cost, today's cost, and a 30-day projected cost.
- **Usage Patterns**: Groups average power consumption into 4-hour interval blocks.
- **Data Export**: Export collected energy session data to JSON or CSV formats.
- **Smart Efficiency Insights**: Calculates and reports an appliance efficiency score.

---

## ⚙️ Prerequisites

Ensure you have the following installed and set up:
1. **Node.js**: Version 16.0.0 or higher ([Download Node.js](https://nodejs.org/)).
2. **Internet Connection**: Required for both Tuya Cloud and MongoDB Atlas connectivity.
3. **MongoDB Atlas Cluster**: A cluster database name `EnergyDB` (configured inside `.env`).
4. **Tuya Developer Credentials**: API keys and the specific Smart Plug Device ID (configured inside `.env`).

---

## 🚀 Getting Started

### Quick Start (Windows)
If you are on Windows, simply double-click the **[`start-project.bat`](file:///d:/CSE407/Midter-Project/start-project.bat)** file. The script will:
1. Verify if Node.js is installed. If missing, it will ask for your permission to automatically download and run the installer.
2. Check if project dependencies (`node_modules`) are missing and request permission to install them.
3. Offer an option to update dependencies if already installed, then automatically run the server.

### Manual Start (Cross-platform)
For Linux, macOS, or standard terminal execution:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🛠️ Environment Configuration (`.env`)

Create/update the **[`.env`](file:///d:/CSE407/Midter-Project/.env)** file in the root directory to manage secret keys:

```env
# Server Port
PORT=3000

# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/EnergyDB

# Tuya Developer API Credentials
TUYA_BASE_URL=https://openapi.tuyaeu.com
TUYA_ACCESS_KEY=your_tuya_access_key
TUYA_SECRET_KEY=your_tuya_secret_key
TUYA_DEVICE_ID=your_smart_plug_device_id
```

---

## 📁 File Structure

- **[`server.js`](file:///d:/CSE407/Midter-Project/server.js)**: The core Express server managing API endpoints (`GET /api/status`, `POST /api/control`), Tuya API communication, and MongoDB database queries.
- **[`models/Powerlog.js`](file:///d:/CSE407/Midter-Project/models/Powerlog.js)**: The Mongoose schema defining the database blueprint for power readings.
- **[`index.html`](file:///d:/CSE407/Midter-Project/index.html)**: The single-page dashboard UI (styled with Tailwind CSS and powered by Chart.js).
- **[`requirements.txt`](file:///d:/CSE407/Midter-Project/requirements.txt)**: List of software requirements and configurations.
- **[`start-project.bat`](file:///d:/CSE407/Midter-Project/start-project.bat)**: Double-click script launcher for Windows.

---

## 🛡️ License

This project is built for academic purposes as a midterm project for CSE407.
