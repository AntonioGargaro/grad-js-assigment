import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import moxios from "moxios";
import OverviewPage from "./";

describe("Testing the OverviewPage component", () => {
    test("OverviewPage renders", () => {
        render(<OverviewPage />);
    });

    test("Overview page autocomplete appears when typing", async () => {
        jest.mock("../../utils/getCitySuggestions");
        const { getByText, getByLabelText } = render(<OverviewPage />);

        expect(getByText("Find your city")).toBeInTheDocument();

        const cityInputNode = getByLabelText("City name");
        fireEvent.change(cityInputNode, { target: { value: "Londo" } });
        expect(cityInputNode.value).toBe("Londo");

        console.log(window.document);

        const londonSuggestion = await waitForElement(() =>
            getByText("London")
        );

        expect(londonSuggestion).toHaveTextContent("London");
        fireEvent.click(londonSuggestion);
        expect(cityInputNode.value).toBe("London");
    });

    test("Overview page lists jobs in London", async () => {
        const page = render(<OverviewPage />);

        const { getByText, getByLabelText } = page;

        expect(getByText("Find your city")).toBeInTheDocument();

        const cityInputNode = getByLabelText("City name");
        fireEvent.change(cityInputNode, { target: { value: "London" } });
        expect(cityInputNode.value).toBe("London");

        moxios.stubRequest(/127.0.0.1:80\/getJobsByCity/, {
            status: 201,
            response: {
                data: { results: [] }
            }
        });

        const searchButton = document.getElementById("searchCity");
        expect(searchButton).toHaveTextContent("Search");
        //fireEvent.click(searchButton);
        //await waitForElement(() => getByText("lol"));
    });
});
