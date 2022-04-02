const express = require('express');
const router = express.Router();

const walletController = require('./wallet.controller');

// Add assets to wallet
router.post('/deposit', function (req, res, next) {
    let assetType = req.body.type; // Asset type to deposit
    let amount = parseFloat(req.body.amount); // Amount to deposit

    if (assetType && amount) {
        walletController.depositAsset(req.user, assetType.toLowerCase(), amount, res, next);
    } else {
        throw Error('Invalid deposit');
    }

});

// Remove assets from wallet
router.post('/withdraw', function (req, res, next) {
    let assetType = req.body.type; // Asset type to withdraw
    let amount = parseFloat(req.body.amount); // Amount to withdraw

    if (assetType && amount) {
        walletController.withdrawAsset(req.user, assetType.toLowerCase(), amount, res, next);
    } else {
        throw Error('Invalid withdaw');
    }
});

// Get current assets of wallet
router.get('/list', function (req, res, next) {
    walletController.listAssets(req.user, res, next);
});

module.exports = router;