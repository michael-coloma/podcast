import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import IconNumber from "./IconNumber";

describe("IconNumber component Test", () => {
  it("renders IconNumber with default value", async () => {
    const { getByText } = render(
      <Router>
        <IconNumber />
      </Router>
    );
    expect(getByText("100")).toBeDefined();
  });

  it("renders IconNumber with otherValue", async () => {
    const { getByText } = render(
      <Router>
        <IconNumber number={10} />
      </Router>
    );
    expect(getByText("10")).toBeDefined();
  });
});
