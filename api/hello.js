const express = require("express");
const getTemperatureInLocation = require("../src/controllers/controllers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/hello", getTemperatureInLocation);

module.exports = app;
