const app = require("./app");
const { PORT } = require("./utils/config");
const { sequelize, connectToDatabase } = require("./utils/db");
require("./models/index");

const start = async () => {
  try {
    await connectToDatabase();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
};

start();
