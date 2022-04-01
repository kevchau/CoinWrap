const coincap = require("../coincap/coincap.service");

/**
 * Calculate how much an asset is worth in USD
 * @param  {string} assetType   Asset type
 * @param  {string} amount      Amount of asset
 * @param  {res} res            Express response object 
 * @param  {next} next          Express next function              
 */
exports.calculateUSD = async (assetType, amount, res, next) => {

    let response = {valueUSD: 0};

    try {
        // Make sure amount > 0
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        // Calculate value of asset in USD
        let rateJSON = await coincap.passRequestPath(`/rates/${assetType}`);

        if (rateJSON.data) {
            let rateUSD = parseFloat(rateJSON.data.rateUsd);
            response.valueUSD = (rateUSD * amount).toFixed(2);
        } else {
            throw Error(`USD rate for ${assetType} not found`)
        }

        res.json(response);
    } catch (err) {
        next(err);
    }
};