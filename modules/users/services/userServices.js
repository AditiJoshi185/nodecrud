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
    if (options.id_not) {
      sql += ` AND id <> ?`;
      values.push(options.id_not);
    }
    if (options.id) {
      sql += ` AND id = ?`;
      values.push(options.id);
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
    let values = [updateObj, options.id];
    let query = `UPDATE users SET ? WHERE id = ?`;
    mysqlLib.runQuery(query, values).then((result) => {
      resolve(result);
    }, (error) => {
      reject(error);
    });
  });
}

function addImage(options) {
  return new Promise((resolve, reject) => {
    let values = [options];
    let sql = `INSERT INTO images SET ?`;
    mysqlLib.runQuery(sql, values).then((result) => {
      return resolve(result);
    }, (error) => {
      return reject(error);
    });
  });
}

function getImage(options) {
  return new Promise((resolve, reject) => {
    let values = [];
    let columns = options.columns || `*`;
    let sql = `SELECT ${columns} FROM images WHERE 1 `;
    if (options.id) {
      sql += ` AND id = ?`;
      values.push(options.id);
    }

    mysqlLib.runQuery(sql, values).then((result) => {
      return resolve(result);
    }, (error) => {
      return reject(error);
    });
  });
}

function addImageLog(options) {
  return new Promise((resolve, reject) => {
    let values = [options];
    let sql = `INSERT INTO image_logs SET ?`;
    mysqlLib.runQuery(sql, values).then((result) => {
      return resolve(result);
    }, (error) => {
      return reject(error);
    });
  });
}

exports.getUser = getUser;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.addImage = addImage;
exports.getImage = getImage;
exports.addImageLog = addImageLog;
