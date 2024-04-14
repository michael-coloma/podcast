import { fireEvent, render, screen } from "@testing-library/react";
import Filter from "./Filter";

describe("Filter component Test", () => {
  test("renders filter input with placeholder and checks onChange too", () => {
    const onChangeMock = jest.fn();
    render(<Filter onChange={onChangeMock} />);

    const inputElement = screen.getByPlaceholderText("Filter podcast...");
    fireEvent.change(inputElement, { target: { value: "value..." } });

    expect(inputElement).toBeInTheDocument();
    expect(onChangeMock).toHaveBeenCalledWith("value...");
  });
});
