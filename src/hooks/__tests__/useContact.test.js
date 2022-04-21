import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { fireEvent, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContact } from "../useContact";
import Contact from "../../pages/Contact";

window.alert = jest.fn();
console.error = jest.fn();

describe("useContact hook", () => {
  // it("should match same input value passed as target value", async () => {
  //   const { getByPlaceholderText } = render(<Contact />);
  //   const nameBox = getByPlaceholderText(/your name/i);
  //   fireEvent.change(nameBox, { target: { value: "Test Name" } });
  //   expect(nameBox.value).toBe("Test Name");
  // });

  it("should call window.alert upon successful submit event", async () => {
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <Contact />
    );
    const nameBox = getByPlaceholderText(/your name/i);
    const emailBox = getByPlaceholderText(/enter email/i);
    const form = getByTestId("contactForm");
    fireEvent.change(nameBox, { target: { value: "Test Name" } });
    fireEvent.change(emailBox, { target: { value: "test@mail.com" } });
    fireEvent.click(getByRole("button"));
    fireEvent.submit(form);
    expect(window.alert).toBeCalled();
  });

  it("should call window.alert upon error submit event", async () => {
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <Contact />
    );
    const nameBox = getByPlaceholderText(/your name/i);
    const emailBox = getByPlaceholderText(/enter email/i);
    const form = getByTestId("contactForm");
    fireEvent.change(nameBox, { target: { value: "" } });
    fireEvent.change(emailBox, { target: { value: "test" } });
    fireEvent.click(getByRole("button"));
    fireEvent.submit(form);
    expect(window.alert).toBeCalled();
  });
});

// it("should make a call to handleSubmit", async () => {
//   const { result } = renderHook(() => useContact());
//   await act(async () => {
//     result.current.setValues({
//       name: "mockName",
//       company: "mockCompany",
//       email: "mockEmail@mock.com",
//       message: "Mock message.",
//     });
//   });
//   expect(result.current.values).toEqual({
//     name: "mockName",
//     company: "mockCompany",
//     email: "mockEmail@mock.com",
//     message: "Mock message.",
//   });
// });

// it("should match same input value passed as target value", async () => {
//   const { getByTestId } = render(<Contact />);
//   // const handleSubmit = jest.fn();
//   const form = getByTestId("contactForm").querySelector("input");
//   await act(() => {
//     fireEvent.submit(form, {
//       target: {
//         value: {
//           name: "mockName",
//           company: "mockCompany",
//           email: "mockEmail@mock.com",
//           message: "Mock message.",
//         },
//       },
//     });
//   });
//   jest.spyOn(window, "alert").mockImplementation(() => {});
//   expect(window.alert).toBeInTheDocument();
// });

// it("renders contact form", async () => {
//   const { result } = renderHook(() =>
//     useContact({
//       values: {
//         username: "Mock",
//         company: "Mock Comp",
//         email: "mock@mock.test",
//         message: "This is a mock.",
//       },
//     })
//   );

//   await act(async () => {
//     // await result.current.setValues();
//     expect(result.current.values).toEqual({
//       username: "Mock",
//       company: "Mock Comp",
//       email: "mock@mock.test",
//       message: "This is a mock.",
//     });
//   });

//   await act(async () => {
//   await result.current.handleSubmit;
//   });
// });
