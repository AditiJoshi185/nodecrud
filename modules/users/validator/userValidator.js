const Joi = require("joi");
const validator = require('./../../../middlewares/validator');

async function addUser(req, res, next) {
  const bodySchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const validBody = await validator.validateFields(bodySchema, req.body);
  if (validBody && !validBody.status) {
    return res.status(400).send({ msg: validBody.error });
  }
  next();
}

async function getUser(req, res, next) {
  const headerSchema = Joi.object({
    token: Joi.string().required(),
  }).unknown();
  const validHeader = await validator.validateFields(headerSchema, req.headers);
  if (validHeader && !validHeader.status) {
    return res.status(400).send({ msg: validHeader.error });
  }
  next();
}

async function deleteUser(req, res, next) {
  const headerSchema = Joi.object({
    token: Joi.string().required(),
  }).unknown();
  const validHeader = await validator.validateFields(headerSchema, req.headers);
  if (validHeader && !validHeader.status) {
    return res.status(400).send({ msg: validHeader.error });
  }
  next();
}

async function updateUser(req, res, next) {
  const bodySchema = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
  }).or('first_name','last_name','email', 'password'); // atleast one key is necessary
  const validBody = await validator.validateFields(bodySchema, req.body);
  const headerSchema = Joi.object({
    token: Joi.string().required(),
  }).unknown();
  const validHeader = await validator.validateFields(headerSchema, req.headers);
  if ((validBody && !validBody.status) || (validHeader && !validHeader.status)) {
    return res.status(400).send({ msg: validHeader.error ||  validBody.error});
  }
  next();
}

async function addImage(req, res, next) {
  const headerSchema = Joi.object({
    token: Joi.string().required(),
  }).unknown();
  const validHeader = await validator.validateFields(headerSchema, req.headers);
  if (validHeader && !validHeader.status) {
    return res.status(400).send({ msg: validHeader.error });
  }
  next();
}

async function getImage(req, res, next) {
  const querySchema = Joi.object({
    id: Joi.number().required()
  });
  const validQuery = await validator.validateFields(querySchema, req.query);
  const headerSchema = Joi.object({
    token: Joi.string().required(),
  }).unknown();
  const validHeader = await validator.validateFields(headerSchema, req.headers);
  if ((validQuery && !validQuery.status) || (validHeader && !validHeader.status)) {
    return res.status(400).send({ msg: validHeader.error });
  }
  next();
}

exports.addUser = addUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.addImage = addImage;
exports.getImage = getImage;
