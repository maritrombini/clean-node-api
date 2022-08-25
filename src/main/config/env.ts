export default {
  mongoUrl: global.__MONGO_URI__ || "mongodb://localhost:27017/clean-node-api",
  port: global.__PORT__ || 5050,
  jwtSecret: global.__JWT_SECRET__ || "tj670==5H",
};
