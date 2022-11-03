import { useEffect, useState } from "react";
import { Data } from "../interfaces";
import { AddNewItem } from "./AddNewItem";
import { CardItem } from "./CardItem";

interface Props {
  items: Data[];
  cardName: string;
  isDragging: boolean;
  handleDragging: (dragging: boolean) => void;
  handleUpdateList: (id: number, cardName: string) => void;
  updateNewCardData?: (data: Data[]) => void;
}

interface cardProps {
  cardName: string;
  handleDragging: (dragging: boolean) => void;
}

export const UpdatedCardItems = ({ cardName, handleDragging }: cardProps) => {
  const cardItems = JSON.parse(localStorage?.getItem?.("items")! || "") || [];
  return cardItems?.map(
    (item: any, index: number) =>
      cardName === item.cardName && (
        <CardItem data={item} key={item.id} handleDragging={handleDragging} />
      )
  );
};

export const ContainerCards = ({
  items = [],
  cardName,
  isDragging,
  handleDragging,
  handleUpdateList,
  updateNewCardData
}: Props) => {
  //  console.log(items);
  //const [cardItems, setCardItems] = useState<any[]>(items);
  const [isNewItemEnabled, setNewItem] = useState(false);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const getItems = () => JSON.parse(localStorage?.getItem("items") as any);

  var cardItems = getItems();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData("text");
    handleUpdateList(id, cardName);
    handleDragging(false);
  };

  const addNewItem = (card: string) => {
    setNewItem(true);
  };

  const constructItems = (data: any) => {
    // setCardItems([
    //   ...cardItems,
    //   {
    //     id: cardItems?.length + Math.floor(Math.random() * 100),
    //     content: data?.name,
    //     cardName: cardName
    //   }
    // ]);
    localStorage.setItem(
      "items",
      JSON.stringify([
        ...cardItems,
        {
          id: cardItems?.length + Math.floor(Math.random() * 100),
          content: data?.name,
          cardName: cardName
        }
      ])
    );
    updateNewCardData?.([
      ...cardItems,
      {
        id: cardItems?.length + Math.floor(Math.random() * 100),
        content: data?.name,
        cardName: cardName
      }
    ]);
  };

  return (
    <div
      className={"grid"}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      key={cardName}
    >
      <h2>{cardName}</h2>
      {/** List the available items in a given card*/}
      <UpdatedCardItems cardName={cardName} handleDragging={handleDragging} />

      {/** New Item Container */}
      <button onClick={() => addNewItem(cardName)}>Add new item</button>
      {isNewItemEnabled && (
        <AddNewItem
          card={cardName}
          onSubmit={(item) => constructItems(item)}
          onCancel={() => setNewItem(false)}
        />
      )}
    </div>
  );
};
