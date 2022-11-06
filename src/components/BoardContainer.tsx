/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { uniqBy } from "lodash";
import { useState } from "react";

import { AddEditItem } from "./AddEditItemForm";
import { CardsContainer } from "./CardsContainer";
import { getCards } from "./helpers/getAvailableCards";
import { useDragAndDrop } from "./helpers/UseDragAndDrop";
import { initialCards } from "../assets/assets";
import { Data } from "../types/interfaces";

export const TrelloBoardContainer = () => {
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

  const [initialData, setData] = useState(initialCards);
  const [cards, setCards] = useState<Data[]>(getInitialCards());
  const [myList, setMyList] = useState([]);

  const {
    isDragging,
    listItems = setMyList,
    handleDragging,
    handleUpdateList
  } = useDragAndDrop(initialData);

  /** Update the Cards Data after you add the new Card */
  const addNewCard = (card: Data) => {
    const updatedCards = [
      ...cards,
      { cardName: card?.content, id: cards?.length + 1 }
    ];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    window.location.href = "#";
  };

  const NewBoard = () => (
    <div>
      <AddEditItem
        onSubmit={(item) => addNewCard(item)}
        onCancel={() => (window.location.href = "#")}
        modalTitle={"Board"}
      />
    </div>
  );

  return (
    <div className="grid" data-testid="grid-board" key={0}>
      {initialData?.length &&
        cards.map((container: Data, index: number) => (
          <>
            <CardsContainer
              items={myList}
              cardName={container.cardName}
              key={container.id}
              isDragging={isDragging}
              handleDragging={handleDragging}
              handleUpdateList={handleUpdateList}
              updateNewCardData={setData}
            />
          </>
        ))}

      {/** New Board Modal */}
      <div id="new-board" className="overlay" data-testid="new-board">
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
  );
};
