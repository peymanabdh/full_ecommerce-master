import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// import database configuration
//import configDatabase from '../config/database';

// import all models sequelize
//import User from '../app/models/User';

// Add models to array
const models = [];

class ReletionalDb {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    //this.connection = new Sequelize(configDatabase);
    //models.map(model => model.init(this.connection));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/database',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
      }
    );
  }
}

export default new ReletionalDb();
