const _ = require('underscore');

const userService = require('./../services/userServices');
const authenticator = require('./../../../middlewares/authenticator');

async function addUser(req, res) {
  try {
    let { email, first_name, last_name, password } = req.body;
    let checkEmailExists = await userService.getUser({ email });
    if (!_.isEmpty(checkEmailExists)) {
      return res.send({ msg: 'Email exists' });
    }
    let result = await userService.addUser({ email, first_name, last_name, password });
    let token = authenticator.generateToken({ user_id: result && result.insertId });
    return res.send({ msg: 'Success', token });

  } catch (error) {
    console.error("ERROR IN ADD USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}

async function getUser(req, res) {
  try {
    let { user_id } = req.query;
    let result = await userService.getUser({ user_id });
    return res.send({ msg: 'Success', result: result && result[0] });
  } catch (error) {
    console.error("ERROR IN GET USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}

async function deleteUser(req, res) {
  try {
    let { user_id } = req.params;
    await userService.updateUser({ user_id, is_deleted: 1 });
    return res.send({ msg: 'Success' });

  } catch (error) {
    console.error("ERROR IN DELETE USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}

async function updateUser(req, res) {
  try {
    let { email, first_name, last_name, password } = req.body;
    let { user_id } = req.params;
    let userData = await userService.getUser({ user_id });
    if (_.isEmpty(userData)) {
      return res.send({ msg: 'User does not exist' });
    }
    [userData] = userData;
    if (email && userData.email !== email) {
      let checkEmailExists = await userService.getUser({ email, user_id_not: user_id });
      if (!_.isEmpty(checkEmailExists)) {
        return res.send({ msg: 'Email exists' });
      }
    }
    await userService.updateUser({ user_id, email, first_name, last_name, password });
    return res.send({ msg: 'Success' });

  } catch (error) {
    console.error("ERROR IN UPDATE USER", error);
    return res.send({ msg: "Something went wrong" });
  }
}


exports.addUser = addUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
