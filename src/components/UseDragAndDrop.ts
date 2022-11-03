import { useEffect, useState } from "react";
import { uniqBy } from "lodash";

import { Data } from "../interfaces";
import { data } from "../assets";

export const useDragAndDrop = (initialState: any[]) => {
  const [isDragging, setIsDragging] = useState(false);
  const t = localStorage?.getItem("items") as any;
  const availableItems = t ? JSON.parse(t) : [];

  const cardItems = uniqBy([...initialState, ...availableItems], "id");

  const [listItems, setListItems] = useState<any[]>(cardItems);

  const handleUpdateList = (id: number, cardName: string) => {
    let card = cardItems.find((item) => item.id === id);

    if (card) {
      card.cardName = cardName;

      setListItems((prev) => {
        let updatedCardItems = [
          card!,
          ...prev.filter((item) => item.id !== id && item.content)
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
