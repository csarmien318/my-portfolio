import { render } from "@testing-library/react";
import ResumeModal from "../ResumeModal";

// window.alert = jest.fn();

describe("Resume Modal", () => {
  it("should render modal", async () => {
    // window.alert.mockClear();
    const { getByTestId } = render(<ResumeModal modalShow="true" />);
    const show = getByTestId("modalVisibility");
    expect(show).toBeTruthy();
  });

  it("should render modal", async () => {
    // window.alert.mockClear();
    const { getByText } = render(<ResumeModal modalShow="true" />);
    const modal = getByText(/close/i);
    expect(modal).toBeInTheDocument();
  });
});
