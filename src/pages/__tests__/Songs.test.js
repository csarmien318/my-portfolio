import { act, render, fireEvent, waitFor } from "@testing-library/react";
import Songs from "../Songs";

window.alert = jest.fn();

describe("Songs Page", () => {
  it("should render songs", async () => {
    const { findByText } = render(<Songs />);
    expect(await findByText("mockTitle")).toBeInTheDocument();
  });

  // it("should render songs", async () => {
  //   window.alert.mockClear();
  //   await act(async () => {
  //     const { getAllByText } = render(<Songs />);
  //     const items = await getAllByText(/songs/i);
  //     expect(items).toHaveLength(1);
  //   });
  // });

  // it("should render songs", async () => {
  //   // window.alert.mockClear();
  //   await act(async () => {
  //     const { getByText } = render(<Songs />);
  //     const items = await getByText("mockId");
  //     expect(items).toBeTruthy();
  //   });
  // });

  // it("should render songs", async () => {
  //   // window.alert.mockClear();
  //   await act(async () => {
  //     const { getByTestId } = render(<Songs />);
  //     await getByTestId("songsTable");
  //     expect(songs).toBeTruthy();
  //   });
  // });
});
