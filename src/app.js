const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const config = require('./config')
const authRouter = require('./auth/auth.route');
const authController = require('./auth/auth.controller');
const coincapRouter = require('./coincap/coincap.route');
const walletRouter = require('./wallet/wallet.route');
const calculatorRouter = require('./calculator/calculator.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/wallet', authController.verifyToken);
app.use('/wallet', walletRouter);
app.use('/calculator', calculatorRouter);
app.use(/^\/((?!wallet|calculator|auth).+)/, coincapRouter);

app.listen(config.express.port, () => {
  console.log(`CoinWrap listening on port ${config.express.port}`)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Respond with error
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

module.exports = app;
