import React from "react";
import { getCards } from "../getAvailableCards";

describe("getAvailableCards helper", () => {
  it("getAvailableCards test with initial data", () => {
    expect(getCards()).toEqual([]);
  });
  it("getAvailableCards test with updated data", () => {
    localStorage.setItem(
      "cards",
      JSON.stringify([
        {
          id: 1,
          cardName: "test"
        }
      ])
    );
    expect(getCards()).toEqual([
      {
        id: 1,
        cardName: "test"
      }
    ]);
    localStorage.setItem("cards", JSON.stringify([]));
  });
});
