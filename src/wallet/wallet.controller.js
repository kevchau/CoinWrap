const Asset = require("./asset.model");
const coincap = require("../coincap/coincap.service");

// Deposit crypto into wallet
exports.depositAsset = async (user, assetType, amount, res, next) => {

    try {
        // Make sure deposit amount > 0
        if (amount <= 0) {
            throw new Error('Deposit amount must be greater than 0');
        }

        // Check if asset type exists
        let typeResponse = await coincap.passRequestPath(`/assets/${assetType}`);
        if ('error' in typeResponse) {
            throw Error('Invalid asset type');
        }

        // Check if user already has asset
        let asset = await Asset.query().findOne({ user: user, assetType: assetType });

        if (asset) {
            // If so, add to existing amount
            let newQuantity = asset.quantity + amount;
            await Asset.query().findById(asset.assetID).patch({ quantity: newQuantity });
        } else {
            // Otherwise insert new asset into user's wallet
            await Asset.query().insert({
                user: user,
                assetType: assetType,
                quantity: amount
            });
        }

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

// Withdraw crypto from wallet
exports.withdrawAsset = async (user, assetType, amount, res, next) => {

    try {

        // Make sure withdraw amount > 0
        if (amount <= 0) {
            throw new Error('Withdraw amount must be greater than 0');
        }

        // Check if user has the asset
        let asset = await Asset.query().findOne({ user: user, assetType: assetType });

        if (!asset) {
            throw Error(`Wallet does not contain ${assetType}`);
        }

        // Calculate new quantity of asset after withdraw
        let newQuantity = asset.quantity - amount;
        if (newQuantity < 0) {
            throw Error(`Wallet does not contain at least ${amount} of ${assetType} withdraw`);
        }

        if (newQuantity > 0) {
            // If remaining quantity > 0 then update asset
            await Asset.query().findById(asset.assetID).patch({ quantity: newQuantity });
        } else if (newQuantity == 0) {
            // Otherwise if remaining == 0 then delete asset
            await Asset.query().deleteById(asset.assetID);
        }

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

// List assets in the user's wallet
exports.listAssets = async (user, res, next) => {
    let response = { assets: [], totalUSD: 0 };
    let totalValue = 0;

    try {
        // Get list of user's assets
        let assets = await Asset.query().where('user', user);

        // Convert to json representation
        for (asset of assets) {
            let assetJSON = asset.toJSON();
            delete assetJSON['assetID'];
            delete assetJSON['user'];

            // Calculate value of asset in USD
            let rateJSON = await coincap.passRequestPath(`/rates/${assetJSON.assetType}`);

            if (rateJSON.data) {
                let rateUSD = parseFloat(rateJSON.data.rateUsd);
                let valueUSD = rateUSD * assetJSON.quantity;
                assetJSON.valueUSD = valueUSD.toFixed(2);
                totalValue += valueUSD;
            } else {
                // Coincap doesn't provide usd rate for all assets
                assetJSON.valueUSD = "unknown";
            }

            response.assets.push(assetJSON);
        }

        response.totalUSD = totalValue.toFixed(2);
        res.json(response);

    } catch (err) {
        next(err);
    }
};
