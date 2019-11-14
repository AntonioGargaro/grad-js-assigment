import React from "react";
import styles from "./JobCard.module.css";

import Button from "../Button";
import Header from "../Header";

const TaskCard = ({ title, description, redirectUrl, location, salary }) => {
    const btnText = "Apply Now";

    const salaryHasBothValues =
        salary.min !== null &&
        salary.min !== 0 &&
        salary.max !== null &&
        salary.max !== 0;

    const minMaxSalaryAreNotEqual = salary.min !== salary.max;

    const handleClick = () => window.open(redirectUrl);
    return (
        <div className={styles.card}>
            <div
                className={`${styles["content-wrapper"]} ${styles["content-wrapper__left"]} `}
            >
                <div className={styles.header}>
                    <Header text={title} />
                    <p>
                        <strong>{location.area}</strong>
                        {salaryHasBothValues &&
                            (minMaxSalaryAreNotEqual
                                ? ` - £${salary.min} to £${salary.max}`
                                : ` - £${salary.min}`)}
                    </p>
                </div>
                <div className={styles.description}>
                    <p>{description}</p>
                </div>
                <div className={styles["button-wrapper"]}>
                    <Button
                        size={"medium"}
                        buttonText={btnText}
                        onClick={handleClick}
                        category={"primary"}
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
