import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("Testing the App component", () => {
    test("App renders as default", () => {
        const app = render(<App />);
    });
});
