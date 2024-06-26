import "@testing-library/jest-dom";

beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };

  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});
