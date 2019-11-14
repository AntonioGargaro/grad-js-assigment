const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const app = express();

app.use(cors());
const bodyParser = require("./middleware/bodyParser");
const port = process.env.PORT;

app.use(bodyParser);
router(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}. Ready to accept requests!`);
});

module.exports = app;
