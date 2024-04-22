import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import PodcastCard from "./PodcastCard";
import podcastDetailsReducer from "../../../secondary/redux/podCastDetailsSlice";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const store = configureStore({
  reducer: {
    podcastDetails: podcastDetailsReducer,
  },
});

const podcast = {
  id: "1",
  imageUrl: "https://example.com/image.png",
  title: "Test Podcast",
  author: "John Doe",
  description: "A test podcast description",
};

const renderTreeComponents = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PodcastCard {...podcast} />
      </MemoryRouter>
    </Provider>,
  );
};

describe("PodcastCard", () => {
  it("renders the podcast information correctly", () => {
    renderTreeComponents();

    expect(screen.getByRole("img", { name: /test podcast/i })).toHaveAttribute("src", "https://example.com/image.png");
    expect(screen.getByText(/test podcast/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  it("navigates and dispatches on card click", () => {
    renderTreeComponents();
    const card = screen.getByText("Test Podcast".toUpperCase());
    fireEvent.click(card);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "podcastDetails/setSelectedPodcast",
        payload: {
          id: "1",
          imageUrl: "https://example.com/image.png",
          title: "Test Podcast",
          author: "John Doe",
          description: "A test podcast description",
        },
      }),
    );

    expect(mockNavigate).toHaveBeenCalledWith(`/podcast/${podcast.id}`);
  });
});
