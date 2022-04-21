import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Contact from "../Contact";

window.alert = jest.fn();

describe("Contact Page", () => {
  it("should render contact", async () => {
    window.alert.mockClear();
    const { getByRole } = render(<Contact />);
    expect(await getByRole("button")).toBeInTheDocument();
  });

  // it("should return contact saved msg", async () => {
  //   window.alert.mockClear();
  //   const { findByText } = render(<Contact />);
  //   await act(async () => {
  //     const click = fireEvent.click(await findByText("Submit"));
  //     expect(click).toBeTruthy();
  //   });
  // });

  // it("renders contact form", async () => {
  //   window.alert.mockClear();
  //   const { getByRole } = render(<Contact />);
  //   const contactForm = getByRole("button", { name: "Submit" });
  //   expect(contactForm).toBeInTheDocument();
  // });

  // Mocking API calls required
  // it("renders contact form", async () => {
  //   await act(async () => {
  //     window.alert.mockClear();
  //     // const handleSubmit = jest.fn();
  //     const { getByTestId } = render(<Contact />);
  //     const formSubmit = await fireEvent.click(getByTestId("contactBtn"));
  //     expect(formSubmit).toBeTruthy();
  //   });
  // });
});
