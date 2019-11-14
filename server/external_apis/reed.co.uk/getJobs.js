const axios = require("axios");
const { base_url, getAuthorization } = require("./");

const getJobs = async (location) => {
    try {
        let authorization = getAuthorization();
        let job_fetch_url = base_url + "?location=" + location;
        return await axios({
            method: "get",
            url: job_fetch_url,
            ...authorization
        });
    } catch (err) {
        console.error(err);
    }
};

module.exports = getJobs;
