import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import {  authRoutes, commentRoutes, espnRoutes, likeRoutes, metadataRoutes, mutePostRoutes, oddsRoutes, postRoutes, quoteRepostRoutes, repostRoutes, userRoutes } from "./routes/index.js";
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reposts", repostRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/quote-reposts", quoteRepostRoutes)
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes)
app.use("/api/muted-posts", mutePostRoutes)
app.use("/api/odds", oddsRoutes);
app.use("/api/espn", espnRoutes)
app.use("/api/metadata", metadataRoutes);

app.listen(8800, () => {
  console.log("backend working.");
});
