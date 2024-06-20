const express = require('express');
const UserController = require('../../../controller/UserController.js');

const usersRouter = express.Router();

usersRouter.post('/register', UserController.create);

module.exports = usersRouter;