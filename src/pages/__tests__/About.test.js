import { render, fireEvent } from "@testing-library/react";
import About from "../About";

window.alert = jest.fn();

describe("About Page", () => {
  it("should render View Resume button", async () => {
    window.alert.mockClear();
    const { getByRole } = render(<About />);
    const button = getByRole("button", { name: "View Resume" });
    expect(button).toBeEnabled();
  });

  it("View Resume btn should be truthy when clicked", async () => {
    window.alert.mockClear();
    const { getByRole } = render(<About />);
    const click = fireEvent.click(getByRole("button", { name: "View Resume" }));
    expect(click).toBeTruthy();
  });

  it("Cards should be truthy", () => {
    window.alert.mockClear();
    const { getAllByTestId } = render(<About />);
    const card = getAllByTestId("aboutMeCards");
    expect(card).toBeTruthy();
  });
});
