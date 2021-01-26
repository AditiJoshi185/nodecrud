const mysql = require('mysql');

function initializeMysql(config) {
  return new Promise((resolve, reject) => {
    let conn = mysql.createPool(config);
    return resolve(conn);
  });
}

exports.initializeMysql = initializeMysql;
