import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

describe("Header Test", () => {
  it("shows exist header", async () => {
    const { getByText } = render(
      <Router>
        <Header isLoading={true} />
      </Router>,
    );
    expect(getByText("Podcaster")).toBeDefined();
  });
});
