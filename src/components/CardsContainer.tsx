/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { AddEditItem } from "./AddEditItemForm";
import { getCards } from "./helpers/getAvailableCards";
import { getItems } from "./helpers/getAvailableTaskItems";
import { TaskItemContainer } from "./TaskContainer";
import { cardProps, Data, Props } from "../types/interfaces";

/** Render the Each Task Item */
export const UpdatedCardItems = ({
  cardName,
  handleDragging,
  removeTaskFromBoard,
  onEditTask
}: cardProps) => {
  const cardItems = getItems();
  return cardItems.map(
    (item: Data) =>
      cardName === item.cardName &&
      item.content && (
        <TaskItemContainer
          data={item}
          key={item.id}
          handleDragging={handleDragging}
          removeTaskFromBoard={removeTaskFromBoard}
          onEditTask={onEditTask}
        />
      )
  );
};

/** This Component holds all the Board/Card layouts */
export const CardsContainer = ({
  cardName,
  handleDragging,
  handleUpdateList,
  updateNewCardData
}: Props) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData("text");
    handleUpdateList(id, cardName);
    handleDragging(false);
  };

  var cardItems = getItems();

  /** This method will be called when we click on new Task  */
  const addNewItem = (card: string) => {
    localStorage.setItem("cardName", card);
    window.location.href = "#new-task";
  };

  /** Update the newly added tasks */
  const constructItemsOfNewlyAddedTask = (data: Data) => {
    const updatedNewlyAddedItem = [
      ...cardItems,
      {
        id: cardItems?.length + Math.floor(Math.random() * 100),
        content: data?.content,
        cardName: localStorage.getItem("cardName") || cardName,
        desc: data?.desc
      }
    ];
    localStorage.setItem("items", JSON.stringify(updatedNewlyAddedItem));
    updateNewCardData?.(updatedNewlyAddedItem);
    window.location.href = "#";
  };

  /** Remove the task in a selected Board */
  const removeTaskFromBoard = (taskId: number) => {
    const updatedTasks = cardItems?.filter((item) => item.id !== taskId);
    updateNewCardData?.(updatedTasks);
    localStorage.setItem("items", JSON.stringify(updatedTasks));
    console.log(taskId, updatedTasks);
  };

  /** Edit the task in a selected Board */
  const onEditTask = (editedData: Data) => {
    const updatedTasks = cardItems?.map((item) =>
      item.id === editedData.id
        ? {
            ...item,
            content: editedData?.content || "",
            desc: editedData?.desc || "",
            cardName: editedData.cardName || ""
          }
        : item
    );
    localStorage.setItem("items", JSON.stringify(updatedTasks));
    updateNewCardData?.(updatedTasks);
    window.location.href = "#";
  };

  /** Remove the Board */
  const removeBoard = (card: string) => {
    const updatedTasks = cardItems?.filter((item) => item.cardName !== card);
    const updatedCards = getCards()?.filter((item) => item.cardName !== card);
    localStorage.setItem("items", JSON.stringify(updatedTasks));
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    updateNewCardData?.(updatedTasks);
    window.location.reload();
  };

  return (
    <div
      className={"grid"}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      draggable={true}
    >
      <span>
        <div
          className="task-buttons"
          style={{ marginTop: "-5px" }}
          data-testid="remove-card"
        >
          <p
            className="close"
            onClick={() => removeBoard(cardName)}
            title="Remove board"
          >
            x
          </p>
        </div>
        <h2 className="card-title" data-testid="card-title">
          {cardName}
        </h2>
        <h2 className="bottom-line" />
      </span>
      {/** List the available items in a given card*/}

      <UpdatedCardItems
        cardName={cardName}
        handleDragging={handleDragging}
        removeTaskFromBoard={removeTaskFromBoard}
        onEditTask={onEditTask}
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
      <div id="new-task" className="overlay" data-testid="new-task">
        <div className="popup">
          <h2>Add New Task</h2>
          <a className="close" href="#">
            &times;
          </a>
          <div className="content">
            <AddEditItem
              card={cardName}
              onSubmit={(item) => constructItemsOfNewlyAddedTask(item)}
              onCancel={() => (window.location.href = "#")}
              modalTitle={"Task"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
