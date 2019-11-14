const getJobsByCity = require("./handlers/jobs/getJobsByCity.js");

module.exports = (app) => {
    app.get("/getJobsByCity", getJobsByCity);
};
