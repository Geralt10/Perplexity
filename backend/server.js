import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { config } from "./src/config/config.js";

async function startServer() {
  try {
    await connectDB();
  } catch (error) {
    console.error(error);
  }
}
startServer();
app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });

