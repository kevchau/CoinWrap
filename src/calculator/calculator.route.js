const express = require('express');
const router = express.Router();

const calculatorController = require('./calculator.controller');

// Convert asset amount to USD
router.get('/', function (req, res, next) {
    let assetType = req.query.type; // Asset type 
    let amount = parseFloat(req.query.amount); // Amount 

    if (assetType && amount) {
        calculatorController.calculateUSD(assetType, amount, res, next);
    } else {
        throw Error('Invalid conversion');
    }

});


module.exports = router;