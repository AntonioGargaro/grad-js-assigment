import closeAllLists from "./closeAllLists";
import styles from "./CitySearch.module.css";

const populateAutocomplete = (
    inputValue,
    inputValueNotBlank,
    citiesData,
    clickOnSuggestionHandler
) => {
    closeAllLists();
    if (inputValueNotBlank) {
        const cityInput = document.getElementById("City");
        const autoCompleteList = document.createElement("DIV");

        autoCompleteList.setAttribute(
            "id",
            cityInput.id + "-autocomplete-list"
        );
        autoCompleteList.setAttribute("class", styles["autocomplete-items"]);

        cityInput.parentNode.appendChild(autoCompleteList);

        let autoCompleteLimit = 5;

        citiesData.some((cityObj, i) => {
            if (i >= autoCompleteLimit) return true;
            let city = cityObj.city;
            if (city === inputValue) return true;

            let matchedCities = document.createElement("DIV");
            let hiddenInputValue = "<input type='hidden' value='" + city + "'>";

            matchedCities.innerHTML = city + hiddenInputValue;

            matchedCities.addEventListener("click", clickOnSuggestionHandler);
            autoCompleteList.appendChild(matchedCities);
            return false;
        });
    }
};

export { populateAutocomplete };
