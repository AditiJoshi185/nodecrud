const _ = require('underscore');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const config = require('./../../../config/index');
const userService = require('./../services/userServices');
const authenticator = require('./../../../middlewares/authenticator');
const awsService = require('./../../../services/aws');

async function addUser(req, res) {
  try {
    let { email, first_name, last_name, password } = req.body;
    let checkEmailExists = await userService.getUser({ email });
    if (!_.isEmpty(checkEmailExists)) {
      return res.status(409).send({ msg: 'Email exists' });
    }
    let id = uuidv4();
    await userService.addUser({ id, email, first_name, last_name, password });
    let token = authenticator.generateToken({ id });
    return res.send({ msg: 'Success', token });

  } catch (error) {
    console.error("ERROR IN ADD USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}

async function getUser(req, res) {
  try {
    let { id } = req.user_info;
    let result = await userService.getUser({columns:['email', 'first_name', 'last_name'], id });
    if(_.isEmpty(result)){
      return res.status(404).send({ msg: 'User does not exist' });
    }
    return res.send({ msg: 'Success', result: result && result[0] });
  } catch (error) {
    console.error("ERROR IN GET USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}

async function deleteUser(req, res) {
  try {
    let { id } = req.user_info;
    let result = await userService.getUser({ id });
    if(_.isEmpty(result)){
      return res.status(404).send({ msg: 'User does not exist' });
    }
    await userService.updateUser({ id, is_deleted: 1 });
    return res.send({ msg: 'Success' });

  } catch (error) {
    console.error("ERROR IN DELETE USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}

async function updateUser(req, res) {
  try {
    let { email, first_name, last_name, password } = req.body;
    let { id } = req.user_info;
    let userData = await userService.getUser({ id });
    if (_.isEmpty(userData)) {
      return res.status(404).send({ msg: 'User does not exist' });
    }
    [userData] = userData;
    if (email && userData.email !== email) {
      let checkEmailExists = await userService.getUser({ email, id_not: id });
      if (!_.isEmpty(checkEmailExists)) {
        return res.send({ msg: 'Email exists' });
      }
    }
    await userService.updateUser({ id, email, first_name, last_name, password });
    return res.send({ msg: 'Success' });

  } catch (error) {
    console.error("ERROR IN UPDATE USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}

async function addImage(req, res) {
  try {
    let { image } = req.files;
    const stream = fs.createReadStream(image.path);
    let fileName = new Date().getTime().toString()+image.name;
    await awsService.uploadImages3(stream, image.type, fileName);
    let url = config.default.s3.URL + fileName;
    await userService.addImage({ url });
    return res.send({ msg: 'Success' });
  } catch (error) {
    console.error("ERROR IN ADD USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}


async function getImage(req, res) {
  try {
    let { id: user_id } = req.user_info;
    let { id } = req.query;
    let result = await userService.getImage({columns:['id','url'], id });
    if(_.isEmpty(result)){
      return res.status(404).send({ msg: 'User does not exist' });
    }
    await userService.addImageLog({image_id:id,user_id});
    return res.send({ msg: 'Success', result: result && result[0] });
  } catch (error) {
    console.error("ERROR IN GET USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}


exports.addUser = addUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.addImage = addImage;
exports.getImage = getImage;
