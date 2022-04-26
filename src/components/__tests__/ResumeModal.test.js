import { render, fireEvent } from "@testing-library/react";
import ResumeModal from "../ResumeModal";
import About from "../../pages/About";

describe("Resume Modal", () => {
  it("should render modal", async () => {
    const { getByText } = render(<ResumeModal modalShow="true" />);
    const modal = getByText(/back/i);
    expect(modal).toBeInTheDocument();
  });

  it("setModalShow function should be called once when Close btn clicked", async () => {
    const setModalShow = jest.fn();
    const { getByRole } = render(
      <ResumeModal modalShow="true" setModalShow={setModalShow} />
    );
    await fireEvent.click(getByRole("button", { name: "Close" }));
    expect(setModalShow).toHaveBeenCalledTimes(1);
  });

  it("Back btn should be truthy when clicked", async () => {
    const { getByRole, getByText } = render(<About />);
    fireEvent.click(getByRole("button", { name: "View Resume" }));
    const click = await fireEvent.click(getByText(/back/i));
    expect(click).toBeTruthy();
  });
});
