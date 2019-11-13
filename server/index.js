const express = require("express");
const router = require("./router.js");
const app = express();

const bodyParser = require("./middleware/bodyParser");
const port = process.env.PORT;

app.use(bodyParser);
router(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}. Ready to accept requests!`);
});

module.exports = app;
