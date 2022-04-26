import { render, fireEvent } from "@testing-library/react";
import { server } from "../../mocks/server";
import { rest } from "msw";
import React from "react";
import Songs from "../Songs";

window.alert = jest.fn();
console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

describe("Songs Page", () => {
  it("should render songs and paginate button", async () => {
    const { findByText, findByRole, getByText, getByRole, queryByRole } =
      render(<Songs />);

    expect(await findByText("House Of Cards")).toBeInTheDocument();
    expect(await findByRole("button", { name: /2/i })).toBeInTheDocument();

    const clickAsc = fireEvent.click(getByText(/year released/i));
    expect(clickAsc).toBeTruthy();

    const clickDesc = fireEvent.click(getByText(/year released/i));
    expect(clickDesc).toBeTruthy();

    const clickAllArtists = fireEvent.click(getByText(/all artists/i));
    expect(clickAllArtists).toBeTruthy();

    fireEvent.click(getByRole("button", { name: /3/i }));
    expect(await findByText("Have a Cigar")).toBeInTheDocument();

    fireEvent.click(await findByText(/radiohead/i));
    expect(queryByRole("button", { name: /3/i })).toBeNull();
  });

  it("should handle server error persisting loader", async () => {
    server.use(
      rest.get("http://localhost:8080/api/songs", (req, res, ctx) => {
        return res.networkError();
      })
    );

    const { getByTestId } = render(<Songs />);
    expect(getByTestId("loaderImg")).toBeInTheDocument();
  });
});
