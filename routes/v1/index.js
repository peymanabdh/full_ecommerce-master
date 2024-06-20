const express = require("express");

// const usersRouter = require('./users');

const middlebaner = require("./middlebaner");
const v1Router = express.Router();

// v1Router.use('/users', usersRouter);
v1Router.use('/middlebaner', middlebaner);

module.exports = v1Router;
