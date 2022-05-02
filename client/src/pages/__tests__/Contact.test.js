import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { server } from "../../mocks/server";
import { rest } from "msw";
import Contact from "../../pages/Contact";

window.alert = jest.fn();
console.error = jest.fn();

describe("Contact page test - useContact.js tested indirectly", () => {
  it("should call window.alert upon successful submit event", async () => {
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <Contact />
    );
    const nameBox = getByPlaceholderText(/your name/i);
    const emailBox = getByPlaceholderText(/enter email/i);
    const form = getByTestId("contactForm");

    await act(async () => {
      fireEvent.change(nameBox, { target: { value: "Test Name" } });
      fireEvent.change(emailBox, { target: { value: "test@mail.com" } });
      fireEvent.click(getByRole("button"));
      fireEvent.submit(form);
    });

    await waitFor(() => expect(window.alert).toBeCalled());
  });

  it("should 1. render @ when error and 2. call window.alert upon error submit event", async () => {
    const { getByPlaceholderText, getByRole, getByTestId, getByText } = render(
      <Contact />
    );
    const nameBox = getByPlaceholderText(/your name/i);
    const emailBox = getByPlaceholderText(/enter email/i);
    const form = getByTestId("contactForm");

    fireEvent.change(nameBox, { target: { value: "T" } });
    fireEvent.change(emailBox, { target: { value: "test" } });
    expect(getByText(/@/i)).toBeInTheDocument();

    fireEvent.click(getByRole("button"));
    fireEvent.submit(form);
    await waitFor(() => expect(window.alert).toBeCalled());
  });

  it("should mock server error", async () => {
    server.use(
      rest.post("http://localhost:8080/api/save", (req, res, ctx) => {
        return res.networkError();
      }),
      rest.post("http://localhost:8080/api/auth", (req, res, ctx) => {
        return res.networkError();
      })
    );
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <Contact />
    );
    const nameBox = getByPlaceholderText(/your name/i);
    const emailBox = getByPlaceholderText(/enter email/i);
    const form = getByTestId("contactForm");

    fireEvent.change(nameBox, { target: { value: "Test" } });
    fireEvent.change(emailBox, { target: { value: "test@mail.com" } });
    fireEvent.click(getByRole("button"));
    fireEvent.submit(form);

    await waitFor(() => expect(window.alert).toBeCalled());
  });
});
