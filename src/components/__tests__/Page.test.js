import { render, screen } from "@testing-library/react";
import Page from "../Page";

window.alert = jest.fn();

it("should render same text passed into title prop", async () => {
  window.alert.mockClear();
  render(<Page title="title" />);
  const headingElement = screen.getByText(/title/i);
  expect(headingElement).toBeInTheDocument();
});
