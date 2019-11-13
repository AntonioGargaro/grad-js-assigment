import React from "react";
import { render } from "@testing-library/react";
import OverviewPage from "./OverviewPage";

describe("Testing the OverviewPage component", () => {
	test("OverviewPage renders in progress as default", () => {
        const { getByText } = render(<OverviewPage 
            
           />);
        getByText("Welcome to your first week, Paul")
	});
});