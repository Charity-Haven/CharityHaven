// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController')
const virfytoken = require('../Middleware/authorization');

router.post('/process-donation',  paymentController.processDonation);

// Endpoint to get all payments
router.get('/payments', virfytoken.authorize, paymentController.getAllPayments);

// Endpoint to get payments by user ID
router.get('/payments/user', virfytoken.authorize, paymentController.getPaymentsByUserId);

module.exports = router;
