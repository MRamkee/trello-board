import React from "react";
import { render, screen } from "@testing-library/react";
import { NavHeader } from "../NavHeader";

test("renders Nav Header component", () => {
  render(<NavHeader />);
  const linkElement = screen.getByText(/Reset the board/i);
  expect(linkElement).toBeInTheDocument();
});
