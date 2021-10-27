const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");
const connectDB = require("../config/db");
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
/*
 * @route  GET /
 * @desc   Base endpoint for the app
 * @access Public
 */
app.get("/", (req, res) => {
  res.json({
    message: "Test endpoint",
  });
});

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
