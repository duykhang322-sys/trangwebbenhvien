const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: String, required: true },
    phone: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    image: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png' }
}, { timestamps: true });
    
module.exports = mongoose.model('Doctor', doctorSchema);