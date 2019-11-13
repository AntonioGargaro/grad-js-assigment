const cities = ["Edinburgh", "London"];

const autocompleteCitySuggestion = (city) => {
    return cities.filter((e) => e.toLowerCase().includes(city.toLowerCase()));
};

export default autocompleteCitySuggestion;
