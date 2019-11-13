const getTasks = async (req, res) => {
    try {
        const cities = ["Edinburgh", "London"];
        console.log(cities);
        res.status(200).json(cities);
    } catch (err) {
        res.status(404).json(err.message);
    }
};

module.exports = getTasks;
