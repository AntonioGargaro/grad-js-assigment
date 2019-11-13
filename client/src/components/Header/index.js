import React from "react";
import styles from "./Header.module.css";

const Header = ({
    size = "medium",
    text,
    sans = false,
    weekday = false,
    centered = false
}) => {
    const headerIsLarge = size === "large";
    const HeaderTag = headerIsLarge ? "h1" : "h2";

    const isCentered = `${centered && styles.centered}`;
    const isSans = `${sans && styles.sans}`;

    let dayStyle;
    if (weekday) {
        const dayName = text.toLowerCase();
        dayStyle = `${styles[dayName]}`;
    }

    return (
        <HeaderTag
            className={`${styles[size]} ${dayStyle} ${isSans} ${isCentered}`}
        >
            {text}
        </HeaderTag>
    );
};

export default Header;
