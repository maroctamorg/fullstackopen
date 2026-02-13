require("dotenv").config();
const { startServer } = require("./server");

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_CONNECTION_STRING;

startServer(port, mongoUri);
