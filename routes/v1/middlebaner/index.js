const express = require("express");
const middleBnaertRouter = express.Router();
const MiddleBanerController = require("../../../controller/MiddleBanerCtrl");
middleBnaertRouter.get(
  "/middle-baners",
  MiddleBanerController.getAllMiddleBaners
);
middleBnaertRouter.post(
  "/add-middle-baners",
  MiddleBanerController.newMiddleBaners
);

module.exports = middleBnaertRouter;
