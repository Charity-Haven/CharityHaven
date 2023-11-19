// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController')
const virfytoken = require('../Middleware/authorization');

router.post('/process-donation', paymentController.processDonation);
router.get('/payments', virfytoken.authorize, paymentController.getAllPayments);
router.get('/payments/user', virfytoken.authorize, paymentController.getPaymentsByUserId);

module.exports = router;
