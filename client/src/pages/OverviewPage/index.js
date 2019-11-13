import React, { useState, useEffect } from "react";

import getCitySuggestions from "../../utils/getCitySuggestions";
import styles from "./OverviewPage.module.css";

import Header from "../../components/Header";
import FormInput from "../../components/Form/Input";

function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    const allAutocompleteItems = document.getElementsByClassName(
        "autocomplete-items"
    );
    for (let item of allAutocompleteItems) {
        item.parentNode.removeChild(item);
    }

    let autoCompleteList = document.getElementById("City-autocomplete-list");
    if (autoCompleteList)
        autoCompleteList.parentNode.removeChild(autoCompleteList);
}

const OverviewPage = () => {
    const [citiesData, setCitiesData] = useState([]);
    const [inputValue, setInputValue] = useState("");

    // Conditonals
    const isInputValueNotBlank = inputValue !== "";

    useEffect(() => {
        if (isInputValueNotBlank) {
            let matchingCities = getCitySuggestions(inputValue);
            setCitiesData(matchingCities);
        }
    }, [inputValue, isInputValueNotBlank]);

    useEffect(() => {
        closeAllLists();

        if (isInputValueNotBlank) {
            let cityInput = document.getElementById("City");
            let autoCompleteList = document.createElement("DIV");

            autoCompleteList.setAttribute(
                "id",
                cityInput.id + "-autocomplete-list"
            );
            autoCompleteList.setAttribute(
                "class",
                styles["autocomplete-items"]
            );

            cityInput.parentNode.appendChild(autoCompleteList);

            citiesData.forEach((city) => {
                if (city === inputValue) return;

                let matchedCities = document.createElement("DIV");

                let matchedLetters =
                    "<strong>" +
                    city.substr(0, inputValue.length) +
                    "</strong>";
                let otherLetters = city.substr(inputValue.length);
                let hiddenInputValue =
                    "<input type='hidden' value='" + city + "'>";

                matchedCities.innerHTML =
                    matchedLetters + otherLetters + hiddenInputValue;

                matchedCities.addEventListener(
                    "click",
                    clickOnSuggestionHandler
                );
                autoCompleteList.appendChild(matchedCities);
            });
        }
    }, [citiesData, inputValue, isInputValueNotBlank]);

    const handleInputChange = (event) => setInputValue(event.target.value);

    const clickOnSuggestionHandler = (event) => {
        const newInputValue = event.target.getElementsByTagName("input")[0]
            .value;

        setInputValue(newInputValue);
        closeAllLists();
    };

    const citySearchForm = (
        <form autoComplete="off">
            <div className={styles.autocomplete}>
                <FormInput
                    label={"City"}
                    handleInputChange={handleInputChange}
                    inputValue={inputValue}
                />
            </div>
            <input type="submit" />
        </form>
    );

    const mainContent = (
        <main className={styles[`top-content`]}>
            <Header size={"large"} text={"Find your city"} />
            {citySearchForm}
        </main>
    );

    return citiesData ? mainContent : <h1>Loading Data...</h1>;
};

export default OverviewPage;
