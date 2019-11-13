const bodyParser = (req, res, next) => {
    if (req.method === "POST" || req.method === "PATCH") {
        let allTheData = "";
        req.on("data", chunk => {
            allTheData += chunk;
        });
        req.on("end", () => {
            try {
                req.body = JSON.parse(allTheData);
            } catch (err) {
                next();
            }
            next();
        });
    } else {
        next();
    }
};

module.exports = bodyParser;
