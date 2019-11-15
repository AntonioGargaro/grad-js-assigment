const base_url = "https://www.reed.co.uk/api/1.0/search";

const getAuthorization = () => {
    if (process.env.CLIENT_AUTH_KEY === undefined) throw TypeError;
    return { auth: { username: process.env.CLIENT_AUTH_KEY } };
};

module.exports = { base_url, getAuthorization };
