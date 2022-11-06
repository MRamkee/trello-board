import React from "react";
import { render, screen } from "@testing-library/react";
import { AddEditItem } from "../AddEditItemForm";

test("renders AddEditItemForm Container component", () => {
  render(<AddEditItem onCancel={() => 0} modalTitle={"Task"} />);
  const linkElement = screen.getByText(/Task name/i);
  expect(linkElement).toBeInTheDocument();
});
