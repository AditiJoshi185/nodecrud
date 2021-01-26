const databases = require('./databases');
const server = require('./server');
const config = require('./../config/index');

async function initialize() {
  try {
    conn = await databases.initializeMysql(config.default.MYSQL);
    await server.createServer(config.default.PORT);
  } catch (error) {
    console.log("ERROR IN INITIALIZATION", error);
    process.exit();
  }
}

exports.initialize = initialize;