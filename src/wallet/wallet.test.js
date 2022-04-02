process.env.DB_FILE = "test.sqlite3";

jest.mock('./../coincap/coincap.service');
const Asset = require("./asset.model");
const walletController = require('./wallet.controller');

describe('Wallet Controller', () => {

    it("Test depositing asset", async () => {
        const mockRes = { sendStatus: jest.fn() };
        const mockNext = jest.fn();
        const user = 'testUser';
        const assetType = 'bitcoin';
        const amount = 5;

        await walletController.depositAsset(user, assetType, amount, mockRes, mockNext);

        expect(mockRes.sendStatus).toHaveBeenCalledWith(200);

        let asset = await Asset.query().findOne({user: user, assetType: assetType});
        expect(asset.quantity).toBe(amount);
    });

    it("Test withdrawing asset", async () => {
        const mockDepositRes = { sendStatus: jest.fn() };
        const mockWithdrawRes = { sendStatus: jest.fn() };
        const mockNext = jest.fn();
        const user = 'testUser2';
        const assetType = 'litecoin';
        const amount = 5;
        const remaining = 1;

        // Deposit assets
        await walletController.depositAsset(user, assetType, amount+remaining, mockDepositRes, mockNext);

        // Withdraw some of the assets
        await walletController.withdrawAsset(user, assetType, amount, mockWithdrawRes, mockNext);
        expect(mockWithdrawRes.sendStatus).toHaveBeenCalledWith(200);

        let asset = await Asset.query().findOne({user: user, assetType: assetType});
        expect(asset.quantity).toBe(remaining);
    });

    it("Test listing assets", async () => {
        const mockDepositRes = { sendStatus: jest.fn() };
        const mockListRes = { json: jest.fn() };
        const mockNext = jest.fn();
        const user = 'testUser3';
        const assetType = 'dogecoin';
        const amount = 6;

        // Deposit asset
        await walletController.depositAsset(user, assetType, amount, mockDepositRes, mockNext);

        // List asset
        await walletController.listAssets(user, mockListRes, mockNext);
        expect(mockListRes.json).toHaveBeenCalledWith({ assets: [ {assetType: assetType, quantity: amount, valueUSD: '3.00'} ], totalUSD: '3.00' });
    });
});