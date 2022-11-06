import React from "react";
import { render, screen } from "@testing-library/react";
import { TrelloBoardContainer } from "../BoardContainer";

test("renders Board Container component", () => {
  render(<TrelloBoardContainer />);
  const linkElement = screen.getByText(/Add new board/i);
  expect(linkElement).toBeInTheDocument();
});
