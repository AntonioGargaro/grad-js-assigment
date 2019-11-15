const autocompleteCitySuggestion = (city) => {
    return cities.filter((e) =>
        e.city.toLowerCase().includes(city.toLowerCase())
    );
};

export default autocompleteCitySuggestion;

export const cities = [
    {
        city: "London"
    }
];
