import cron from "node-cron";
import userModel from "../models/user.model.js";

cron.schedule("0 * * * *", async () => {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  await userModel.deleteMany({
    verified: false,
    createdAt: {
      $lt: oneDayAgo,
    },
  });

  console.log("Old unverified users cleaned");
});