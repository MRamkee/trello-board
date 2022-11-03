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

export const getItems = () => {
  const t = localStorage?.getItem("items") as any;
  const availableItems = t ? JSON.parse(t) : [];
  return availableItems;
};

export const UpdatedCardItems = ({ cardName, handleDragging }: cardProps) => {
  const cardItems = getItems();
  return cardItems.map(
    (item: any) =>
      cardName === item.cardName &&
      item.content && (
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

  var cardItems = getItems();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData("text");
    handleUpdateList(id, cardName);
    handleDragging(false);
  };

  const addNewItem = (card: string) => {
    setNewItem(true);
    window.location.href = "#new-task";
  };

  const constructItems = (data: any) => {
    const updatedNewlyAddedItem = [
      ...cardItems,
      {
        id: cardItems?.length + Math.floor(Math.random() * 100),
        content: data?.name,
        cardName: data.cardName,
        desc: data?.desc
      }
    ];
    localStorage.setItem("items", JSON.stringify(updatedNewlyAddedItem));
    updateNewCardData?.(updatedNewlyAddedItem);
  };

  return (
    <div
      className={"grid"}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      key={cardName}
    >
      <h2 className="bottom-line">{cardName}</h2>
      {/** List the available items in a given card*/}
      <UpdatedCardItems cardName={cardName} handleDragging={handleDragging} />

      {/** New Item Container */}
      <button className="btn" onClick={() => addNewItem(cardName)}>
        Add new task
      </button>
      {isNewItemEnabled && (
        <AddNewItem
          card={cardName}
          onSubmit={(item) => constructItems(item)}
          onCancel={() => setNewItem(false)}
        />
      )}

      {/** New Board Modal 
      <div id="new-task" className="overlay">
        <div className="popup">
          <h2>Add New Task</h2>
          <a className="close" href="#">
            &times;
          </a>
          <div className="content">
            <AddNewItem
              card={cardName}
              onSubmit={(item) => constructItems(item)}
              onCancel={() => (window.location.href = "#")}
            />
          </div>
        </div>
      </div>*/}
    </div>
  );
};
