import "@testing-library/jest-dom"; //important to toBeInDocument() to run
import SplashScreen from "../../pages/SplashScreen";
import { render } from "./componentTestConfig";
import React from "react"

it("should render splash screen properly", () => {
  const page = render(<SplashScreen />);
  expect(page.asFragment()).toMatchSnapshot();
});
