require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { TuyaContext } = require('@tuya/tuya-connector-nodejs');
const mongoose = require('mongoose');
const PowerLog = require('./models/Powerlog'); // Imports your new database blueprint

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Adds the frontend to the server

// --- MONGODB ATLAS CONNECTION ---
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));


// --- TUYA CONFIGURATION ---
const tuya = new TuyaContext({
  baseUrl: process.env.TUYA_BASE_URL || 'https://openapi.tuyaeu.com',
  accessKey: process.env.TUYA_ACCESS_KEY,
  secretKey: process.env.TUYA_SECRET_KEY,
});
const DEVICE_ID = process.env.TUYA_DEVICE_ID;


// Fetch Live Status & Save to Database
app.get('/api/status', async (req, res) => {
  try {
    const status = await tuya.request({
      path: `/v1.0/iot-03/devices/${DEVICE_ID}/status`,
      method: 'GET'
    });

    // If Tuya data is successfully retrieved, extract it and log it to MongoDB
    if (status.success && status.result) {
        let voltage = 0, current = 0, power = 0;

        // Parse the Tuya sensor codes
        status.result.forEach(item => {
            if (item.code === 'cur_voltage') voltage = item.value / 10;
            if (item.code === 'cur_current') current = item.value / 1000;
            if (item.code === 'cur_power') power = item.value / 10;
        });

        // Calculate a 3-second energy/cost slice for the database record
        const kwhSlice = (power / 1000) * (3 / 3600);
        const costSlice = kwhSlice * 9.50; // Assuming 9.50 BDT rate

        // Create the database entry using your Schema
        const newLog = new PowerLog({
            deviceId: DEVICE_ID,
            voltage: voltage,
            current: current,
            watts: power,
            kwh: kwhSlice,
            cost: costSlice
        });

        // Save silently in the background
        await newLog.save();
    }

    // Send the live data back to the frontend to update the dashboard
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Control the Plug
app.post('/api/control', async (req, res) => {
  const { command, value } = req.body;
  try {
    const result = await tuya.request({
      path: `/v1.0/iot-03/devices/${DEVICE_ID}/commands`,
      method: 'POST',
      body: { commands: [{ code: command, value: value }] }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- DYNAMIC PORT FOR CLOUD HOSTING ---
// Render.com uses process.env.PORT, while your local machine defaults to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));