/* MODULES */
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

/* Routes */
const postRoutes = require("./src/routes/postRoute");
const authRoutes = require("./src/routes/authRoute");
const tagRoutes = require("./src/routes/tagRoute");

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

/* Router */
app.use("/api/v1", postRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", tagRoutes);
app.use("/api/v1/assets", express.static(path.join(__dirname, "assets")));

mongoose.connect(process.env.MONGO_URI).then((conn) => {
   console.log(`MongoDB connected: ${conn.connection.host}`);
   app.listen(port, () => console.log(`Server is running on port ${port}`));
}).catch((err) => console.log(err));