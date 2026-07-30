const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.MONGODB_DB_NAME || "mern_admin";

const connectDb = async () => {
  try {
    if (!URI) {
      throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(URI, {
      dbName: DATABASE_NAME,
    });

    console.log(`connection successful to db: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
