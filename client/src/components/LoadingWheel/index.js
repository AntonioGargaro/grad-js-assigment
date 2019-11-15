import React from "react";

import styles from "./LoadingWheel.module.css";

const LoadingWheel = () => {
    return (
        <div id="loader-container">
            <div className={styles.loader}></div>
        </div>
    );
};

export default LoadingWheel;
