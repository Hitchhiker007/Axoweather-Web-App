import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../page";

describe("Page", () => {
  it("renders children correctly", () => {
    render(<Page />);
    expect(screen.getByText("What's The Weather?")).toBeInTheDocument();
  });
});
