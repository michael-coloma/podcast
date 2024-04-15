import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Test", () => {
  it("renders loader component when isloading is true", () => {
    const { getByTestId } = render(<Loader isLoading={true} />);

    const loaderClassName = getByTestId("loader");

    expect(loaderClassName).toBeInTheDocument();
  });

  it("does not render the loader when isLoading is false", () => {
    const { container } = render(<Loader isLoading={false} />);

    expect(container.firstChild).toBeNull();
  });
});
