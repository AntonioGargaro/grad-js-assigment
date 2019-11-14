const getJobs = require("../../external_apis/reed.co.uk/getJobs");

const getJobsByCity = async (req, res) => {
    try {
        let city = escape(req.query.city);
        let jobs = (await getJobs(city)).data;
        res.status(200).json(jobs);
    } catch (err) {
        res.status(404).json(err.message);
    }
};

module.exports = getJobsByCity;
