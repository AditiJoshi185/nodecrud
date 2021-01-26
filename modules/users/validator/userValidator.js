const Joi = require("joi");
const validator = require('./../../../middlewares/validator');

async function addUser(req, res, next) {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const valid = await validator.validateFields(schema, req.body);
  if (valid && !valid.status) {
    return res.status(400).send({ msg: valid.error });
  }
  next();
}

async function getUser(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
  });
  const valid = await validator.validateFields(schema, req.query);
  if (valid && !valid.status) {
    return res.status(400).send({ msg: valid.error });
  }
  next();
}

async function deleteUser(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
  });
  const valid = await validator.validateFields(schema, req.params);
  if (valid && !valid.status) {
    return res.status(400).send({ msg: valid.error });
  }
  next();
}

async function updateUser(req, res, next) {
  const schema = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
  });
  const valid = await validator.validateFields(schema, req.body);
  if (valid && !valid.status) {
    return res.status(400).send({ msg: valid.error });
  }
  next();
}

exports.addUser = addUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
