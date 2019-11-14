import React, { useState, useEffect } from "react";

import getCitySuggestions from "../../utils/getCitySuggestions";
import styles from "./OverviewPage.module.css";

import Header from "../../components/Header";
import FormInput from "../../components/Form/Input";
import JobCard from "../../components/JobCard";

import axios from "axios";

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
    const [inputError, setInputError] = useState(false);
    const [fetchingJobData, setFetchingJobData] = useState(false);
    const [jobsData, setJobsData] = useState([]);

    // Conditonals

    const isInputValueNotBlank = inputValue !== "";
    const jobsDataIsPopulated = jobsData.length > 0;

    useEffect(() => {
        console.log(jobsData);
    }, [jobsData]);

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

            let autoCompleteLimit = 5;

            citiesData.some((cityObj, i) => {
                if (i >= 5) return true;
                let city = cityObj.city;
                if (city === inputValue) return true;

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
        setInputError(false);
        closeAllLists();

        setJobsData([]);

        setFetchingJobData(true);

        try {
            const response = await axios.get("/getJobsByCity", {
                params: {
                    city: inputValue
                }
            });
            if (response.status !== 200) console.error("TODO handle");

            setJobsData(response.data.results);
        } catch (err) {
            console.error(err);
        }
    };

    // Page renders

    const loadingWheel = (
        <div id="loader-container">
            <div className={styles.loader}></div>
        </div>
    );

    const listOfJobs = (
        <section>
            {jobsData.map((job) => (
                <JobCard
                    key={job.jobId}
                    title={job.jobTitle}
                    description={job.jobDescription}
                    redirectUrl={job.jobUrl}
                    location={{ area: job.locationName }}
                    salary={{ min: job.minimumSalary, max: job.maximumSalary }}
                />
            ))}
        </section>
    );

    const citySearchForm = (
        <form autoComplete="off" onSubmit={handleOnSubmit}>
            <div className={styles.autocomplete}>
                <FormInput
                    label={"City"}
                    handleInputChange={handleInputChange}
                    inputValue={inputValue}
                    isError={inputError}
                />
            </div>
            <input type="submit" />
        </form>
    );

    const mainContent = (
        <main className={styles[`top-content`]}>
            <Header size={"large"} text={"Find your city"} />
            {citySearchForm}
            {fetchingJobData &&
                (jobsDataIsPopulated ? listOfJobs : loadingWheel)}
        </main>
    );

    return citiesData ? mainContent : <h1>Loading Data...</h1>;
};

export default OverviewPage;
