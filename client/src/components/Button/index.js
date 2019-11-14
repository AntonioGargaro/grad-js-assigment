import React from "react";
import styles from "./Button.module.css";

const defaultOnClick = () => console.log("Set onClick prop as callback");

const Button = ({
    size = "medium",
    category = "primary",
    buttonText,
    onClick = defaultOnClick,
    isActive = true
}) => {
    return (
        <button
            className={`${styles.button} ${styles[category]} ${styles[size]}  ${
                !isActive ? styles["inactive"] : ""
            }`}
            onClick={onClick}
            disabled={!isActive}
        >
            {buttonText}
        </button>
    );
};
export default Button;
