
function runQuery(query, params) {
  return new Promise((resolve, reject) => {
    conn.query(query, params, function (error, result) {
      if (error) {
        return reject({ ERROR: error, QUERY: query.sql });
      }
      return resolve(result);
    });
  });
}

exports.runQuery = runQuery;