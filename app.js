const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const studentRouters = require("./api/routes/students");
const bookRoutes = require("./api/routes/books");
const borrowRoutes = require("./api/routes/borrows");
const staffRoutes = require("./api/routes/staff");

//require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1:27017/testdb");

//app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/students", studentRouters);
app.use("/books", bookRoutes);
app.use("/borrows", borrowRoutes);
app.use("/staff", staffRoutes);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
