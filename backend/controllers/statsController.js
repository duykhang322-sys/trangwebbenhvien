const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Invoice = require('../models/Invoice');

const getStats = async (req, res) => {
    try {
        const totalPatients = await User.countDocuments({ role: 'Patient' });
        const totalDoctors = await Doctor.countDocuments();
        const totalAppointments = await Appointment.countDocuments();
        
        const paidInvoices = await Invoice.find({ status: 'Paid' });
        const totalRevenue = paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);

        res.status(200).json({ 
            totalPatients, 
            totalDoctors, 
            totalAppointments, 
            totalRevenue 
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thống kê', error: error.message });
    }
};

module.exports = { getStats };