const express = require('express');
const router = express.Router();
const { getDoctors, addDoctor, deleteDoctor, updateDoctor } = require('../controllers/doctorController');
const { verifyToken, verifyRole } = require('../middleware/AuthMiddleWare');

router.get('/', getDoctors);
router.post('/add', verifyToken, verifyRole(['Admin']), addDoctor);
router.put('/:id', verifyToken, verifyRole(['Admin']), updateDoctor);
router.delete('/:id', verifyToken, verifyRole(['Admin']), deleteDoctor);

module.exports = router;