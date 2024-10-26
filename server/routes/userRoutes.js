// server/routes/ruleRoutes.js
const express = require('express');
const { evaluateEligibility } = require('../controllers/ruleController');

const router = express.Router();

// POST request to evaluate eligibility
router.post('/evaluate', evaluateEligibility);

module.exports = router;
