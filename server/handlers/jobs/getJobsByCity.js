const getJobs = require("../../external_apis/reed.co.uk/getJobs");

const getJobsByCity = async (req, res) => {
    try {
        if (req.query.city === undefined)
            throw new TypeError("City param missing");

        let city = escape(req.query.city);
        let jobs = await getJobs(city);
        let jobsData = jobs.data;
        res.status(200).json(jobsData);
    } catch (err) {
        if (err instanceof TypeError && err.status === 401) {
            res.status(err.status).json(err.message);
            return;
        }
        res.status(422).json(err.message);
    }
};

module.exports = getJobsByCity;
