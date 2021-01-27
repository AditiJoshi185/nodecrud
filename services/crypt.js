let bcrypt = require('bcrypt');
const saltRounds = 10;

function createHash(text){
  const hash = bcrypt.hashSync(text, saltRounds);
  return hash;
}

function compareHash(text, hash){
  return bcrypt.compareSync(text, hash);
}

exports.createHash = createHash;
exports.compareHash = compareHash;
