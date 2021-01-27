var jwt = require('jsonwebtoken');
const config = require('./../config/index');

const secretKey = config.default.JWT.secretKey;

function generateToken(payload) {
  var token = jwt.sign(payload, secretKey);
  return token;
}

function verify(token) {
  try {
    var decoded = jwt.verify(token, secretKey);
    return { status: true, payload :decoded };
  } catch (err) {
    return { status: false };
  }
}

function authenticate(req, res, next) {
  let data = verify(req.headers.token);
  if (data && !data.status) {
    return res.status(401).send({ msg: 'Invalid Access' });
  }
  req.user_info = { id: data.payload && data.payload.id }; 
  next();
}

exports.generateToken = generateToken;
exports.authenticate = authenticate;
