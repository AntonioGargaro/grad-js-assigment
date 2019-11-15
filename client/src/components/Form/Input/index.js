import React from "react";

import styles from "./Input.module.css";
import formStyles from "../Form.module.css";

const Input = ({ label, handleInputChange, isError = false, inputValue }) => {
    return (
        <div className={styles.container}>
            <label className={styles["label-container"]} htmlFor={label}>
                City name
            </label>
            <input
                type="text"
                name={label}
                id={label}
                onChange={handleInputChange}
                className={`${formStyles.input} 
            ${isError ? formStyles.redborder : formStyles.greenborder} `}
                value={inputValue}
            ></input>
        </div>
    );
};

export default Input;
