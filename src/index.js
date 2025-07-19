import express from "express";
import connectDB from "./config/dbConfig.js";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routers/apiRouter.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:3000", "https://careerhubportal.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API routes
app.use("/api", apiRouter);

// Health check
app.get("/", (req, res) => res.send("careerHub API is running"));

// ✅ ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error("Error handler:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
