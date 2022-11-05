/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { uniqBy } from "lodash";

import { Data } from "../../types/interfaces";

export const useDragAndDrop = (initialState: Data[]) => {
  const [isDragging, setIsDragging] = useState(false);
  const t = localStorage?.getItem("items") as any;
  const availableItems = t ? JSON.parse(t) : [];

  const cardItems = uniqBy([...initialState, ...availableItems], "id");

  const [listItems, setListItems] = useState<Data[]>(cardItems);

  const handleUpdateList = (id: number, cardName: string) => {
    let card = cardItems.find((item) => item.id === id);

    if (card) {
      card.cardName = cardName;

      setListItems((prev) => {
        let updatedCardItems = [
          card!,
          ...prev.filter((item) => item.id !== id && item.content !== "")
        ];
        localStorage.setItem("items", JSON.stringify(updatedCardItems));
        return updatedCardItems;
      });
    }
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return {
    isDragging,
    listItems: cardItems,
    handleUpdateList,
    handleDragging
  };
};
