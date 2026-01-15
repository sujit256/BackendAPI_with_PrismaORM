import express from "express";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();
connectDB();

const app = new express();
app.use(express.json());

//api routes
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

//handle unhanlded promise rejection {eg database connection errors }
process.on("unhandleRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received , shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(1); 
  });
});




//get post put delete

// auth - signup  login
//movie - getting all movies
// user - profile
// watchlist -
