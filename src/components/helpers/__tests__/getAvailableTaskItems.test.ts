import React from "react";
import { getItems } from "../getAvailableTaskItems";

describe("getAvailableTaskItems helper", () => {
  it("getAvailableTaskItems test with initial data", () => {
    expect(getItems()).toEqual([]);
  });
  it("getAvailableTaskItems test with updated data", () => {
    localStorage.setItem(
      "items",
      JSON.stringify([
        {
          id: 1,
          cardName: "test",
          content: "Test1"
        }
      ])
    );
    expect(getItems()).toEqual([
      {
        id: 1,
        cardName: "test",
        content: "Test1"
      }
    ]);
    localStorage.setItem("items", JSON.stringify([]));
  });
});
