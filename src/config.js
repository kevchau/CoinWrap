var config = module.exports;

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: '127.0.0.1'
};

config.db = {
    dbFile: process.env.DB_FILE || './coinwrap.sqlite3'
};

config.coincap = {
  baseUrl: process.env.COINCAP_URL || 'https://api.coincap.io/v2'
};

config.auth = {
  secret: process.env.SECRET || "2d4a93dbd851e52fdcdad17e9c2a8c1d7385fd4f3c255629a97e20ced7ee37a62ba64518b8f6c364e55f28919c6fe00fcd75323e06be1b4f834ffca5ee8d35b0",
  iterations: process.env.ITERATIONS || 10,
  keyLength: process.env.KEY_LENGTH || 64,
  digest: process.env.DIGEST || 'sha512'
};