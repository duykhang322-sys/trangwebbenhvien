const express = require('express');
const router = express.Router();
const { getInvoices, payInvoice } = require('../controllers/InvoiceController');
const { verifyToken, verifyRole } = require('../middleware/AuthMiddleWare');

router.get('/', verifyToken, getInvoices);
router.put('/pay/:id', verifyToken, verifyRole(['Receptionist', 'Admin', 'Patient']), payInvoice);

module.exports = router;