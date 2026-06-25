import "dotenv/config"
import app from "./src/app.js";

import connectDB from "./src/config/database.js";
import "./src/jobs/cleanupUnverifiedUsers.js";
import "./src/config/cache.js";


async function startServer() {
  try {
    await connectDB();
  } catch (error) {
    console.error(error);
  }
}
startServer();
app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });

