import { uniqBy } from "lodash";
import { ContainerCards, getItems } from "./ContainerCards";
import { useDragAndDrop } from "./UseDragAndDrop";
import { data, initialCards } from "../assets";
import { useState } from "react";
import { AddNewItem } from "./AddNewItem";

// Move this to helper
export const getCards = () => {
  const t = localStorage?.getItem("cards") as any;
  const availableCards = t ? JSON.parse(t) : [];
  return availableCards;
};

export const DragAndDrop = () => {
  const getInitialCards = () => {
    const cachedCards = uniqBy(getCards(), "cardName")?.filter((item) =>
      Boolean(item.cardName)
    );
    if (cachedCards?.length > 0) {
      return cachedCards;
    } else {
      localStorage.setItem("cards", JSON.stringify(initialCards));
      return initialCards;
    }
  };

  const [initialData, setData] = useState(data);
  const [cards, setCards] = useState<any[]>(getInitialCards());
  const [myList, setMyList] = useState([]);

  const {
    isDragging,
    listItems = setMyList,
    handleDragging,
    handleUpdateList
  } = useDragAndDrop(initialData);

  const addNewCard = (card: any) => {
    const updatedCards = [
      ...cards,
      { cardName: card?.name, id: cards?.length + 1 }
    ];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    window.location.href = "#";
  };

  const NewBoard = () => {
    return (
      <div>
        <AddNewItem
          onSubmit={(item) => addNewCard(item)}
          onCancel={() => (window.location.href = "#")}
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
              cardName={container.cardName}
              key={index}
              isDragging={isDragging}
              handleDragging={handleDragging}
              handleUpdateList={handleUpdateList}
              updateNewCardData={setData}
            />
          </>
        ))}

      <div>
        <button onClick={() => (window.location.href = "#new-board")}>
          Add new board
        </button>

        {/** New Board Modal */}
        <div id="new-board" className="overlay">
          <div className="popup">
            <h2>Add New Board</h2>
            <a className="close" href="#">
              &times;
            </a>
            <div className="content">
              <NewBoard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
