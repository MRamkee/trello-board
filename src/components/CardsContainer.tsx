/* eslint-disable jsx-a11y/anchor-is-valid */

import { Data } from "../interfaces";
import { AddNewItem } from "./AddNewItem";
import { CardItem } from "./TaskContainer";

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
  removeTaskFromBoard: (taskId: number) => void;
}

export const getItems = () => {
  const t = localStorage?.getItem("items") as any;
  const availableItems = t ? JSON.parse(t) : [];
  return availableItems;
};

export const UpdatedCardItems = ({
  cardName,
  handleDragging,
  removeTaskFromBoard
}: cardProps) => {
  const cardItems = getItems();
  return cardItems.map(
    (item: any) =>
      cardName === item.cardName &&
      item.content && (
        <CardItem
          data={item}
          key={item.id}
          handleDragging={handleDragging}
          removeTaskFromBoard={removeTaskFromBoard}
        />
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
    localStorage.setItem("cardName", card);
    window.location.href = "#new-task";
  };

  const constructItemsOfNewlyAddedTask = (data: any) => {
    const updatedNewlyAddedItem = [
      ...cardItems,
      {
        id: cardItems?.length + Math.floor(Math.random() * 100),
        content: data?.name,
        cardName: localStorage.getItem("cardName") || cardName,
        desc: data?.desc
      }
    ];
    localStorage.setItem("items", JSON.stringify(updatedNewlyAddedItem));
    updateNewCardData?.(updatedNewlyAddedItem);
    window.location.href = "#";
  };

  const removeTaskFromBoard = (taskId: number) => {
    const updatedTasks = cardItems?.filter((item) => item.id != taskId);
    localStorage.setItem("items", JSON.stringify(updatedTasks));
    updateNewCardData?.(updatedTasks);
    window.location.href = "#";
  };

  return (
    <div
      className={"grid"}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      key={cardName}
      draggable={true}
    >
      <span>
        <h2 className="bottom-line" data-testid="card-title">
          {cardName}
        </h2>
        {/* <a className="close" href="#" data-testid="card-close">
          &times;
        </a> */}
      </span>
      {/** List the available items in a given card*/}
      <UpdatedCardItems
        cardName={cardName}
        handleDragging={handleDragging}
        removeTaskFromBoard={removeTaskFromBoard}
      />

      {/** New Item Container */}
      <button
        className="btn"
        onClick={() => addNewItem(cardName)}
        data-testid="add-new-task"
      >
        + Add new task
      </button>

      {/** New Board Modal */}
      <div id="new-task" className="overlay">
        <div className="popup">
          <h2>Add New Task</h2>
          <a className="close" href="#">
            &times;
          </a>
          <div className="content">
            <AddNewItem
              card={cardName}
              onSubmit={(item) => constructItemsOfNewlyAddedTask(item)}
              onCancel={() => (window.location.href = "#")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
