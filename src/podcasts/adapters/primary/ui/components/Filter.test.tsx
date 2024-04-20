import { fireEvent, render, screen } from "@testing-library/react";
import Filter from "./Filter";

const onDataFilteredMock = jest.fn();
const mockData = [
  {
    id: "1",
    title: "Podcast 1",
    author: "Author 1",
  },
  {
    id: "2",
    title: "Podcast 2",
    author: "Author 2",
  },
];

describe("Filter component Test", () => {
  it("checks data is filtered by title 'Podcasts 3' correclty", () => {
    render(<Filter data={mockData} byFields={["title"]} onDataFiltered={onDataFilteredMock} />);

    const inputElement = screen.getByPlaceholderText("Filter podcast...");
    fireEvent.change(inputElement, { target: { value: "Podcast 2" } });

    //check input by placeHolder
    expect(inputElement).toBeInTheDocument();

    expect(onDataFilteredMock).toHaveBeenCalledWith([
      {
        id: "2",
        title: "Podcast 2",
        author: "Author 2",
      },
    ]);
  });

  it("checks that filter is empty if there are not matches", () => {
    render(<Filter data={mockData} byFields={["title"]} onDataFiltered={onDataFilteredMock} />);

    const inputElement = screen.getByPlaceholderText("Filter podcast...");
    fireEvent.change(inputElement, { target: { value: "other podcast" } });

    //check input by placeHolder
    expect(inputElement).toBeInTheDocument();

    expect(onDataFilteredMock).toHaveBeenCalledWith([]);
  });
});
