// const mongoose = require("mongoose");
// class MongoDb {
//   constructor() {
//     this.mongoConnectionString =
//       process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/Ecommerce-File";
//     this.connect();
//   }

//   async connect() {
//     try {
//       mongoose.set("strictQuery", false);
//       await mongoose.connect(this.mongoConnectionString, {
//         // useNewUrlParser: false,
//         // useUnifiedTopology: true,
//       });
//       console.log("MongoDB connected successfully");
//     } catch (error) {
//       console.error("MongoDB connection error:", error);
//     }
//   }
// }

// module.exports = MongoDb;
const mongoose = require("mongoose");

class MongoDb {
  constructor() {
    if (!MongoDb.instance) {
      this.mongoConnectionString =
        process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/Ecommerce-File";
      this.connect();
      MongoDb.instance = this;
    }

    return MongoDb.instance;
  }

  async connect() {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(this.mongoConnectionString, {
        // useNewUrlParser: false,
        // useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
}


module.exports = MongoDb;

