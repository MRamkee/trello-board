import { useEffect, useState } from "react";
import { uniqBy } from "lodash";
import { Data } from "../interfaces";
import { data } from "../assets";

export const useDragAndDrop = (initialState: any[]) => {
  const [isDragging, setIsDragging] = useState(false);
  const availableItems =
    JSON.parse(localStorage?.getItem("items") as any) || data;

  const cardItems = uniqBy([...initialState, ...availableItems], "id");

  console.log("All Card Items", [...initialState, ...availableItems]);

  const [listItems, setListItems] = useState<any[]>(cardItems);

  const handleUpdateList = (id: number, cardName: string) => {
    let card = cardItems.find((item) => item.id === id);

    if (card) {
      card.cardName = cardName;

      setListItems((prev) => {
        let updatedCardItems = [
          card!,
          ...prev.filter((item) => item.id !== id)
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
