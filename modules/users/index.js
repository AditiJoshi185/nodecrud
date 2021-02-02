var multipart                              = require('connect-multiparty');
var multipartMiddleware                    = multipart();

const express = require('express');
const router = express.Router();

const userController = require('./controller/userController');
const userValidator = require('./validator/userValidator');
const authenticator = require('./../../middlewares/authenticator');

router.post('/', userValidator.addUser, userController.addUser);
router.get('/', userValidator.getUser, authenticator.authenticate, userController.getUser);
router.delete('/', userValidator.deleteUser, authenticator.authenticate,userController.deleteUser);
router.patch('/', userValidator.updateUser, authenticator.authenticate,userController.updateUser);

router.post('/image',userValidator.addImage, multipartMiddleware, authenticator.authenticate, userController.addImage);
router.get('/image', userValidator.getImage, authenticator.authenticate, userController.getImage);

module.exports = router;
