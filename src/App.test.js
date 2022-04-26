import { render } from "@testing-library/react";
import { AppRoutes } from "./App";
import { MemoryRouter } from "react-router-dom";
// import { rest } from "msw";
// import { setupServer } from "msw/node";

// const server = setupServer(
//   rest.post("http://localhost:8080/api/auth", (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ mockToken: "mockToken" }));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

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
