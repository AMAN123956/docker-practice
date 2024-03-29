const mongoose = require("mongoose");
require("dotenv").config({ path: "../config/dev.env" });

const connectDB = async () => {
  try {
    console.log('uri')
    console.log(process.env.MONGODB_URI)
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`Mongodb connected at ${conn.connection.host}`.cyan.bold);
  } catch (e) {
    console.log("MongoDB cannot be connected : ", e);
    process.exit(1);
  }
};

module.exports = connectDB;
