var jwt = require('jsonwebtoken');
const config = require('./../config/index');

const secretKey = config.default.JWT.secretKey;

function generateToken(payload) {
  var token = jwt.sign(payload, secretKey);
  return token;
}

function verify(token, payload) {
  try {
    var decoded = jwt.verify(token, secretKey);
    console.log(decoded)
    if (payload.user_id != decoded.user_id) {
      return { status: false };
    }
    return { status: true };
  } catch (err) {
    return { status: false };
  }
}

function authenticate(req, res, next) {
  let data = verify(req.headers.token, req.query);
  if (data && !data.status) {
    return res.status(401).send({ msg: 'Invalid Access' });
  }
  next();
}

exports.generateToken = generateToken;
exports.authenticate = authenticate;
