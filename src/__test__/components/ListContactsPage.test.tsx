import "@testing-library/jest-dom"; // to run toBeInDocument()
import { act } from "react-dom/test-utils";
import { ListContactPage } from "../../pages/contact/ListContactsPage";
import "../../__mocks__/matchMedia";
import { render,waitFor } from "./componentTestConfig";
import React from "react"

jest.mock("../../services/api");
it("should render listcontactspage by using act and match previous snapshot", async () => {
  const page = render(<ListContactPage />);
  await act(async () => {
    page.rerender(<ListContactPage />);
  });
  expect(page.asFragment()).toMatchSnapshot();
});

it("after listcontactspage is rendered asynchronously, there should be table element", async () => {
  const page = render(<ListContactPage />);
  const tableElement = await waitFor(() => page.getByTestId('table'));
  expect(tableElement).toBeDefined()
});
