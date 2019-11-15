import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./CitySearch.module.css";
import closeAllLists from "./closeAllLists";
import { populateAutocomplete } from "./utils";
import getCitySuggestions from "../../utils/getCitySuggestions";

import FormInput from "../Form/Input";

const CitySearchForm = ({
    setJobsData,
    setFetchingJobData,
    setCitiesData,
    citiesData
}) => {
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState(false);

    // Conditonals
    const inputValueNotBlank = inputValue !== "";

    // Handler callbacks
    const handleInputChange = (event) => setInputValue(event.target.value);
    const clickOnSuggestionHandler = (event) => {
        const newInputValue = event.target.getElementsByTagName("input")[0]
            .value;

        setInputValue(newInputValue);
        closeAllLists();
    };
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        let citySuggestions = getCitySuggestions(inputValue);
        let isInputValueAValidCity = citySuggestions.some(
            (cityObj) => cityObj.city.toLowerCase() === inputValue.toLowerCase()
        );

        if (!isInputValueAValidCity) {
            setInputError(true);
            return;
        }

        closeAllLists();
        setInputError(false);
        setJobsData([]);
        setFetchingJobData(true);

        try {
            const response = await axios.get("/getJobsByCity", {
                params: { city: inputValue }
            });
            if (response.status !== 200) console.error("TODO handle");

            setJobsData(response.data.results);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (inputValueNotBlank) {
            setCitiesData(getCitySuggestions(inputValue));
        }
    }, [inputValue, inputValueNotBlank, setCitiesData]);

    useEffect(() => {
        populateAutocomplete(
            inputValue,
            inputValueNotBlank,
            citiesData,
            clickOnSuggestionHandler
        );
    }, [citiesData, inputValue, inputValueNotBlank]);

    return (
        <form autoComplete="off" onSubmit={handleOnSubmit}>
            <div className={styles.autocomplete}>
                <FormInput
                    label={"City"}
                    handleInputChange={handleInputChange}
                    inputValue={inputValue}
                    isError={inputError}
                />
            </div>
            <button id={"searchCity"} type="submit">
                Search
            </button>
        </form>
    );
};

export default CitySearchForm;
