import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./OverviewPage.module.css";

import Header from "../../components/Header";

const OverviewPage = () => {
    const [citiesData, setCitiesData] = useState(null);

    useEffect(() => {
        axios.get("/cities").then((res) => setCitiesData(res.data));
    }, [setCitiesData]);

    const mainContent = (
        <main className={styles[`top-content`]}>
            <Header size={"large"} text={"Find your city"} />
            <ul>
                {citiesData &&
                    citiesData.map((city) => <li key={city}>{city}</li>)}
            </ul>
        </main>
    );

    return citiesData ? mainContent : <h1>Loading Data...</h1>;
};

export default OverviewPage;
