const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// data imports
const authRoutes = require("./routes/auth.routes.js");
const apiInfo = require("./routes/info.routes.js");
const { MONGO_URI, PORT } = require("./utils/config.js");

// CONFIGURATION
const app = express();
app.use(express.json());
app.use(helmet());

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/api", authRoutes);
app.use("/api", apiInfo);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({ message: error.message });
});

// MONGOOSE SETUP AND SERVER START
const db = mongoose.connect;

db(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
