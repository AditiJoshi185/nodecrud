var multipart                              = require('connect-multiparty');
var multipartMiddleware                    = multipart();

const userController = require('./controller/userController');
const userValidator = require('./validator/userValidator');
const authenticator = require('./../../middlewares/authenticator');

app.post('/user', userValidator.addUser, userController.addUser);
app.get('/user', userValidator.getUser, authenticator.authenticate, userController.getUser);
app.delete('/user', userValidator.deleteUser, authenticator.authenticate,userController.deleteUser);
app.patch('/user', userValidator.updateUser, authenticator.authenticate,userController.updateUser);

app.post('/user/image',userValidator.addImage, multipartMiddleware, authenticator.authenticate, userController.addImage);
app.get('/user/image', userValidator.getImage, authenticator.authenticate, userController.getImage);
