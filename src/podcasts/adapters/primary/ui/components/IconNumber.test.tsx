import { render } from "@testing-library/react";
import IconNumber from "./IconNumber";

describe("IconNumber component Test", () => {
  it("renders IconNumber with default value", async () => {
    const { getByText } = render(<IconNumber />);
    expect(getByText("100")).toBeDefined();
  });

  it("renders IconNumber with otherValue", async () => {
    const { getByText } = render(<IconNumber number={10} />);
    expect(getByText("10")).toBeDefined();
  });
});
