const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const usersRouter = require("./routes/api/users");
const boardRouter = require("./routes/api/board");
const cardRouter = require("./routes/api/card");
const columnRouter = require("./routes/api/column");
const helpRouter = require("./routes/api/needhelp");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("./config/auth_config");

app.use("/api/users", usersRouter);
app.use("/api/board", boardRouter);
app.use("/api/card", cardRouter);
app.use("/api/column", columnRouter);
app.use("/api/column", columnRouter);
app.use("/api", helpRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

module.exports = app;
