const express = require('express');
const router = express.Router();
const { getInvoices, payInvoice } = require('../controllers/invoiceController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleWare');

router.get('/', verifyToken, getInvoices);
router.put('/pay/:id', verifyToken, verifyRole(['Receptionist', 'Admin', 'Patient']), payInvoice);

module.exports = router;