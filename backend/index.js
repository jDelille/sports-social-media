import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  alertRoutes,
  authRoutes,
  commentRoutes,
  espnRoutes,
  imageUploadRoutes,
  likeRoutes,
  metadataRoutes,
  moneylineRoutes,
  mutePostRoutes,
  oddsRoutes,
  postRoutes,
  quoteRepostRoutes,
  recordRoutes,
  relationshipRoutes,
  repostRoutes,
  spreadRoutes,
  totalRoutes,
  userRoutes,
} from "./routes/index.js";
const app = express();

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

/**
 * Post routes
 */
app.use("/api/posts", postRoutes);
app.use("/api/quote-reposts", quoteRepostRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reposts", repostRoutes);
app.use("/api/muted-posts", mutePostRoutes);
app.use("/api/metadata", metadataRoutes);
app.use("/api/image-upload", imageUploadRoutes);

/**
 * User routes
 */
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/relationships", relationshipRoutes);

/**
 * Alert routes
 */
app.use("/api/alerts", alertRoutes);

/**
 * Sport routes
 */
app.use("/api/odds", oddsRoutes);
app.use("/api/espn", espnRoutes);

/**
 * Bet checking routes
 */
app.use("/api/bet-record", recordRoutes);
app.use("/api/moneyline", moneylineRoutes);
app.use("/api/spread", spreadRoutes);
app.use("/api/total", totalRoutes);

app.listen(8800, () => {
  console.log("backend working.");
});
