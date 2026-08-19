const mongoose = require('mongoose');

// This defines the exact blueprint for your Deep Freezer data
const powerLogSchema = new mongoose.Schema({
    deviceId: { 
        type: String, 
        default: 'bf8755d1f9677a968cppsw' // Your specific Tuya Device ID
    },
    voltage: { 
        type: Number, 
        required: true 
    },
    current: { 
        type: Number, 
        required: true 
    },
    watts: { 
        type: Number, 
        required: true 
    },
    kwh: { 
        type: Number, 
        required: true 
    },
    cost: { 
        type: Number, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now // Automatically generates the exact time the reading was taken
    }
});

module.exports = mongoose.model('PowerLog', powerLogSchema);