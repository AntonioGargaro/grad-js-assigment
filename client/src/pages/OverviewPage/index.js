import React, { useState } from "react";

import styles from "./OverviewPage.module.css";

import Header from "../../components/Header";
import CitySearch from "../../components/CitySearch";
import JobCard from "../../components/JobCard";
import LoadingWheel from "../../components/LoadingWheel";

const OverviewPage = () => {
    const [citiesData, setCitiesData] = useState([]);
    const [fetchingJobData, setFetchingJobData] = useState(false);
    const [jobsData, setJobsData] = useState([]);

    const jobsDataIsPopulated = jobsData.length > 0;

    // Page renders

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

    const mainContent = (
        <main className={styles[`top-content`]}>
            <Header size={"large"} text={"Find your city"} />
            <CitySearch
                setJobsData={setJobsData}
                setFetchingJobData={setFetchingJobData}
                citiesData={citiesData}
                setCitiesData={setCitiesData}
            />
            {fetchingJobData &&
                (jobsDataIsPopulated ? listOfJobs : <LoadingWheel />)}
        </main>
    );

    return citiesData ? mainContent : <h1>Loading Data...</h1>;
};

export default OverviewPage;
