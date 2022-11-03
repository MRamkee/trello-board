import { ContainerCards } from "./ContainerCards";
import { useDragAndDrop } from "./UseDragAndDrop";
import { data } from "../assets";
import { useEffect, useState } from "react";
import { AddNewItem } from "./AddNewItem";
import { Data } from "../interfaces";

export const DragAndDrop = () => {
  const initialCards: any[] = [
    {
      id: 1,
      name: "Todo"
    },
    {
      id: 2,
      name: "In Progress"
    },
    {
      id: 3,
      name: "Completed"
    }
  ];

  const [initialData, setData] = useState(data);
  const [newCard, setNewCard] = useState(false);
  const [cards, setCards] = useState<any[]>(initialCards);
  const [myList, setMyList] = useState([]);

  const {
    isDragging,
    listItems = setMyList,
    handleDragging,
    handleUpdateList
  } = useDragAndDrop(initialData);

  const test = (data1: any) => {
    console.log(localStorage.getItem("items"));
    setData(data1);
  };

  const NewBoard = () => {
    return (
      <div>
        <AddNewItem
          onSubmit={(item) => setCards([...cards, item?.name])}
          onCancel={() => setNewCard(false)}
        />
      </div>
    );
  };

  return (
    <div className="grid">
      {initialData?.length &&
        cards.map((container, index) => (
          <>
            <ContainerCards
              items={myList}
              cardName={container.name}
              key={index}
              isDragging={isDragging}
              handleDragging={handleDragging}
              handleUpdateList={handleUpdateList}
              updateNewCardData={test}
            />
          </>
        ))}
      <button onClick={() => setNewCard(true)}>Add new board</button>
      {newCard && <NewBoard />}
    </div>
  );
};
