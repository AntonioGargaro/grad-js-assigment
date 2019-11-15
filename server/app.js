const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const app = express();

app.use(cors());
const bodyParser = require("./middleware/bodyParser");

app.use(bodyParser);
router(app);

module.exports = app;
