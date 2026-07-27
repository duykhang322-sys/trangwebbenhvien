const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicalRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Unpaid', 'Paid'], default: 'Unpaid' }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);