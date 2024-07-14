const express = require("express");
const http = require("http");
const mongoDb = require("./config/mongoDb.js");
const OTPService = require("./helpers/OTPService.js");
const apiRouter = require("./routes");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const xssCleaner = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const swaggerDocument = require('./utils/swagger.json');

class Server {
  constructor() {
    if (!Server.__instance) {
      this.app = express();
      this.middlewares();
      this.routes();
      this.bootstrap();
    }
    return Server.__instance;
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
      })
    );
    this.app.use(express.static("public"));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(xssCleaner());
    this.app.use(mongoSanitize());
    this.app.use(hpp());
  }

  routes() {
    this.app.use("/", apiRouter);
  }

  bootstrap() {
    const instance = new mongoDb();
    Object.freeze(instance);
    //console.log(OTPService.generateOTP());
    //OTPService.sendOTP("09194462348",OTPService.generateOTP())
    const server = http.createServer(this.app);
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  }
}

// module.exports = Server();
const __instance = new Server();
Object.freeze(__instance);

module.exports = __instance;


git config --global user.email "peyman.abd.rahmani@gmail.com"
git config --global user.name "peymanrahmani"