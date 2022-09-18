import "@testing-library/jest-dom"; //important to toBeInDocument() to run
import { act } from "react-dom/test-utils";
import { ListContactPage } from "../../pages/contact/ListContactsPage";
import "../../__mocks__/matchMedia";
import { render } from "./componentTestConfig";
import React from 'react'

jest.mock("../../services/api");
it("should render listcontactspage by using act for async operation", async () => {
  const page = render(<ListContactPage />);
  await act(async () => {
    page.rerender(<ListContactPage />);
  });
  expect(page.asFragment()).toMatchSnapshot();
});
