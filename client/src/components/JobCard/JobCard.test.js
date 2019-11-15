import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import JobCard from "./";

describe("Testing the TaskCard component", () => {
    test("JobCard renders", () => {
        const salary = { min: 1, max: 1 },
            location = { area: "London" };
        render(<JobCard salary={salary} location={location} />);
    });
});
