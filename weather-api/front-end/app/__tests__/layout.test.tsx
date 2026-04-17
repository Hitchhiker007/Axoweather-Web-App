import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "../layout";

describe("Layout", () => {
  it("renders children correctly", () => {
    render(<Layout>hello</Layout>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
