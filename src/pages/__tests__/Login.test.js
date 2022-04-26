import { act, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import App from "../../App";

window.alert = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

describe("Login page functionality", () => {
  it("should...", async () => {
    const { getByPlaceholderText, getByRole, getByTestId, getByText } = render(
      <App />
    );
    const usernameBox = getByPlaceholderText(/enter username/i);
    const passwordBox = getByPlaceholderText(/password/i);
    const button = getByRole("button", { name: /submit/i });
    const form = getByTestId("loginForm");

    fireEvent.change(usernameBox, { target: { value: "test1000" } });
    fireEvent.change(passwordBox, { target: { value: "test1000test" } });
    fireEvent.blur(passwordBox);
    fireEvent.click(button);

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => expect(form).toBeTruthy());
  });

  it("should...", async () => {
    const { getByPlaceholderText, getByRole, getByTestId, getByText } = render(
      <App />
    );
    const usernameBox = getByPlaceholderText(/enter username/i);
    const passwordBox = getByPlaceholderText(/password/i);
    const button = getByRole("button", { name: /submit/i });
    const form = getByTestId("loginForm");

    fireEvent.change(usernameBox, { target: { value: "test1111" } });
    fireEvent.change(passwordBox, { target: { value: "test1111test" } });
    fireEvent.blur(passwordBox);
    fireEvent.click(button);

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => expect(window.alert).toBeCalled());
  });

  it("should handle in-browser validation error", async () => {
    const { getByPlaceholderText, getByRole } = render(<App />);
    const usernameBox = getByPlaceholderText(/enter username/i);
    const passwordBox = getByPlaceholderText(/password/i);
    const button = getByRole("button", { name: /submit/i });

    fireEvent.change(usernameBox, { target: { value: "test@" } });
    fireEvent.change(passwordBox, { target: { value: "test@" } });
    fireEvent.blur(passwordBox);
    fireEvent.click(button);

    await waitFor(() => expect(window.alert).toBeCalled());
  });
});
