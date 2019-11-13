const Geonames = require("geonames.js");

try {
    const geonames = new Geonames({
        username: process.env.GEONAMES_USER,
        lan: "en",
        encoding: "JSON"
    });

    module.exports = geonames;
} catch (err) {
    console.error(err);
}
