import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "../layout";

describe("Layout", () => {
  // 👈 groups related tests together
  it("renders children correctly", () => {
    // 👈 individual test
    render(<Layout>hello</Layout>); // 👈 render the component
    expect(screen.getByText("hello")).toBeInTheDocument(); // 👈 assertion
  });
});
