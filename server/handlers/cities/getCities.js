const getTasks = async (req, res) => {
    try {
        let cities = ["Edinburgh", "London"];
        res.status(200).json(cities);
    } catch (err) {
        res.status(404).json(err.message);
    }
};

module.exports = getTasks;
