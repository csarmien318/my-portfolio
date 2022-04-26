import { render } from "@testing-library/react";
import Home from "../Home";

window.alert = jest.fn();

describe("Home Page", () => {
  it("should render opening statement upon render", async () => {
    window.alert.mockClear();
    const { getByText } = render(<Home />);
    const welcomeMsg = getByText(/A brief message.../i);
    expect(welcomeMsg).toBeInTheDocument();
  });
});
