import { render } from "@testing-library/react";
import { AppRoutes } from "./App";
import { MemoryRouter } from "react-router-dom";

window.alert = jest.fn();

describe("Routes rendered when isUser === false", () => {
  it("should render Header", () => {
    window.alert.mockClear();
    const { getByText } = render(
      <MemoryRouter>
        <AppRoutes isUser="true" />
      </MemoryRouter>
    );
    const home = getByText(/welcome/i);
    expect(home).toBeInTheDocument();
  });
});
