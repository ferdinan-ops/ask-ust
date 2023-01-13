/* MODULES */
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

/* ROUTES */
const answerRoutes = require("./src/routes/answerRoute");
const postRoutes = require("./src/routes/postRoute");
const authRoutes = require("./src/routes/authRoute");
const tagRoutes = require("./src/routes/tagRoute");
const userRoutes = require("./src/routes/userRoute");
const notifRoutes = require("./src/routes/notifRoute");

/* CONFIGURATIONS */
dotenv.config();
mongoose.set("strictQuery", false);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* UPLOAD CONFIG */
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads");
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + " - " + file.originalname);
   }
});

const upload = multer({ storage });

/* ROUTER */
app.use("/api/v1", answerRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", tagRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", notifRoutes);

/* UPLOAD ROUTES */
app.use("/api/v1/upload", upload.single("file"), (req, res) => {
   const { filename } = req.file;
   const compressedPath = path.join(__dirname, "assets", filename);

   sharp(req.file.path)
      .resize(200, 200)
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(compressedPath, (err, info) => {
         if (info) {
            fs.unlinkSync(req.file.path);
            res.status(200).json(filename);
         }
      });
});
app.use("/api/v1/assets", express.static(path.join(__dirname, "assets")));

/* CONNECT */
mongoose.connect(process.env.MONGO_URI).then((conn) => {
   console.log(`MongoDB connected: ${conn.connection.host}`);
   app.listen(port, () => console.log(`Server is running on port ${port}`));
}).catch((err) => console.log(err));
