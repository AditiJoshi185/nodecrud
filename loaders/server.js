const http = require('http');

function createServer(port) {
  return new Promise((resolve, reject) => {
    http.createServer(app).listen(port, () => {
      console.log("---SERVER STARTED---", port);
      return resolve();
    });
  });
}

exports.createServer = createServer;