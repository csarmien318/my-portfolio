import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Weather from "../Weather";
import { server } from "../../mocks/server";
import { rest } from "msw";

console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

describe("Weather page functionality", () => {
  it("should render weather information from weather api", async () => {
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <Weather />
    );
    const searchBar = getByPlaceholderText("Enter a city or zip code");
    const form = getByTestId("weatherForm");

    fireEvent.change(searchBar, { target: { value: "Test" } });
    expect(searchBar.value).toBe("Test");

    fireEvent.click(getByRole("button"));
    fireEvent.submit(form);

    await waitFor(() =>
      expect(getByTestId("weatherContainer")).toBeInTheDocument()
    );
  });

  it("should handle 400 error status", async () => {
    server.use(
      rest.get(
        "https://api.weatherapi.com/v1/current.json",
        async (req, res, ctx) => {
          return res(ctx.status(400));
        }
      )
    );

    const { getByPlaceholderText, getByRole, getByTestId, getByText } = render(
      <Weather />
    );
    const searchBar = getByPlaceholderText("Enter a city or zip code");
    const form = getByTestId("weatherForm");

    fireEvent.change(searchBar, { target: { value: "Test" } });
    fireEvent.click(getByRole("button"));
    fireEvent.submit(form);

    await waitFor(() =>
      expect(
        getByText("Sorry, we couldn't find the city you entered.")
      ).toBeInTheDocument()
    );
  });

  it("should handle error when user submits blank field value", async () => {
    server.use(
      rest.get(
        "https://api.weatherapi.com/v1/current.json",
        async (req, res, ctx) => {
          return res.networkError();
        }
      )
    );

    const { getByPlaceholderText, getByRole, getByTestId, getByText } = render(
      <Weather />
    );
    const searchBar = getByPlaceholderText("Enter a city or zip code");
    const form = getByTestId("weatherForm");

    fireEvent.change(searchBar, { target: { value: "" } });
    fireEvent.click(getByRole("button"));
    fireEvent.submit(form);

    await waitFor(() => expect(getByText("Enter a city")).toBeInTheDocument());
  });

  it("should handle server error", async () => {
    server.use(
      rest.get(
        "https://api.weatherapi.com/v1/current.json",
        async (req, res, ctx) => {
          return res.networkError();
        }
      )
    );

    const { getByPlaceholderText, getByRole, getByTestId, getByText } = render(
      <Weather />
    );
    const searchBar = getByPlaceholderText("Enter a city or zip code");
    const form = getByTestId("weatherForm");

    fireEvent.change(searchBar, { target: { value: "New York" } });
    fireEvent.click(getByRole("button"));
    fireEvent.submit(form);

    await waitFor(() =>
      expect(getByText("An unexpected error occurred.")).toBeInTheDocument()
    );
  });
});
