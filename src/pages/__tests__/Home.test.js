import { render } from "@testing-library/react";
import Home from "../Home";
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

describe("Home Page", () => {
  it("should render opening statement upon render", async () => {
    window.alert.mockClear();
    const { getByText } = render(<Home />);
    const welcomeMsg = getByText(/A brief message.../i);
    expect(welcomeMsg).toBeInTheDocument();
  });
});
