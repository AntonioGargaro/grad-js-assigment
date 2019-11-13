const getCities = require("./handlers/cities/getCities.js");

module.exports = (app) => {
    app.get("/cities", getCities);
};
