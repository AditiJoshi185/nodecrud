const mysqlLib = require('./../../../databases/mysqlLib');

function getUser(options) {
  return new Promise((resolve, reject) => {
    let values = [];
    let columns = options.columns || `*`;
    let sql = `SELECT ${columns} FROM users WHERE 1 AND is_deleted = 0`;
    if (options.email) {
      sql += ` AND email = ?`;
      values.push(options.email);
    }
    if (options.user_id_not) {
      sql += ` AND user_id <> ?`;
      values.push(options.user_id_not);
    }
    if (options.user_id) {
      sql += ` AND user_id = ?`;
      values.push(options.user_id);
    }

    mysqlLib.runQuery(sql, values).then((result) => {
      return resolve(result);
    }, (error) => {
      return reject(error);
    });
  });
}

function addUser(options) {
  return new Promise((resolve, reject) => {
    let values = [options];
    let sql = `INSERT INTO users SET ?`;
    mysqlLib.runQuery(sql, values).then((result) => {
      return resolve(result);
    }, (error) => {
      return reject(error);
    });
  });
}

function updateUser(options) {
  return new Promise((resolve, reject) => {
    let updateObj = {};
    options.is_deleted ? updateObj.is_deleted = options.is_deleted : 0;
    options.first_name ? updateObj.first_name = options.first_name : 0;
    options.last_name ? updateObj.last_name = options.last_name : 0;
    options.email ? updateObj.email = options.email : 0;
    options.password ? updateObj.password = options.password : 0;
    let values = [updateObj, options.user_id];
    let query = `UPDATE users SET ? WHERE user_id = ?`;
    mysqlLib.runQuery(query, values).then((result) => {
      resolve(result);
    }, (error) => {
      reject(error);
    });
  });
}


exports.getUser = getUser;
exports.addUser = addUser;
exports.updateUser = updateUser;
