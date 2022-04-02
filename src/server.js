const app = require("./app");
const config = require('./config')

app.listen(config.express.port, () => {
    console.log(`CoinWrap listening on port ${config.express.port}`)
});