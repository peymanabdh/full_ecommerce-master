const express = require("express");

// const usersRouter = require('./users');

const middlebaner = require("./middlebaner");
const post = require("./post");
const v1Router = express.Router();

// v1Router.use('/users', usersRouter);
v1Router.use("/middlebaner", middlebaner);
v1Router.use("/posts/", post);

module.exports = v1Router;
