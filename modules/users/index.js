const userController = require('./controller/userController');
const userValidator = require('./validator/userValidator');
const authenticator = require('./../../middlewares/authenticator');

app.post('/user', userValidator.addUser, userController.addUser);
app.get('/user', userValidator.getUser, authenticator.authenticate, userController.getUser);
app.delete('/user/:user_id', userValidator.deleteUser, userController.deleteUser);
app.patch('/user/:user_id', userValidator.updateUser, userController.updateUser);
