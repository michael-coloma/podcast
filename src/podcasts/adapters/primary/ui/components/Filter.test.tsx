import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Filter from "./Filter";

describe("Filter component Test", () => {
  test("renders filter input with placeholder", () => {
    render(<Filter />);
    const inputElement = screen.getByPlaceholderText("Filter podcast...");
    expect(inputElement).toBeInTheDocument();
  });
});
