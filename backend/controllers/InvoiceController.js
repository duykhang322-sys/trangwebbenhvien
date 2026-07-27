const Invoice = require('../models/Invoice');

const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate('patientId', 'username')
            .populate('medicalRecordId', 'diagnosis');
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách hóa đơn', error: error.message });
    }
};

const payInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(
            req.params.id, 
            { status: 'Paid' }, 
            { new: true }
        );
        res.status(200).json({ message: 'Thanh toán thành công', invoice });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi thanh toán', error: error.message });
    }
};

module.exports = { getInvoices, payInvoice };