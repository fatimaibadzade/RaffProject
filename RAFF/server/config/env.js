const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "MONGO_URI=mongodb://localhost:27017/raffproject",
  jwtSecret: process.env.JWT_SECRET || "raff-dev-secret"
};

module.exports = env;
