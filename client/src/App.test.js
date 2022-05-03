import { render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import { AppRoutes } from "./App";
import { MemoryRouter } from "react-router-dom";
import useAuth from "./hooks/useAuth";

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

  it("should update isUser when set", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.setUser(true);
    });

    expect(result.current.isUser).toBe(true);
  });
});
