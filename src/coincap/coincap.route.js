const express = require('express');
const router = express.Router();

const coincap = require("../coincap/coincap.service");

// Clone CoinCap API
router.get('*', async function (req, res, next) {
  try {
    let jsonResponse = await coincap.passRequestPath(req.originalUrl);
    res.json(jsonResponse);
  } catch (err) {
    next(err);
  }
});

module.exports = router;