import React from "react";

import styles from "../Form.module.css";

const Input = ({ label, handleInputChange, isError = false, inputValue }) => {
    return (
        <input
            type="text"
            name={label}
            id={label}
            onChange={handleInputChange}
            className={`${styles.input} 
            ${isError ? styles.redborder : styles.greenborder} `}
            value={inputValue}
        ></input>
    );
};

export default Input;
