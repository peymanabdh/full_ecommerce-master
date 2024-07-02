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
middleBnaertRouter.get(
  "/active-middle-baners",
  MiddleBanerController.getActiveBaners
);

module.exports = middleBnaertRouter;
