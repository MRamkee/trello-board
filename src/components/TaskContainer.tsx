/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Data } from "../types/interfaces";
import { AddEditItem } from "./AddEditItem";

interface Props {
  data: Data;
  handleDragging: (dragging: boolean) => void;
  removeTaskFromBoard?: (taskId: number) => void;
  onEditTask?: (editedData: Data) => void;
}

export const TaskItemContainer = ({
  data,
  handleDragging,
  removeTaskFromBoard,
  onEditTask
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", `${data.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);

  const onEdit = () => {
    setIsEdit(true);
    window.location.href = `#edit-${data.id.toString()}`;
  };

  return (
    <>
      <div
        className="grid-item"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        key={data.id}
      >
        <div className="task-buttons">
          <p className="close" onClick={() => removeTaskFromBoard?.(data?.id)}>
            x
          </p>
        </div>
        <div className="task-title">
          <p>{data.content}</p>
        </div>
        <div className="edit">
          <p onClick={onEdit}>Edit</p>
        </div>
      </div>

      {/** Task Details Modal  */}

      <div id={`edit-${data.id.toString()}`} className="overlay">
        <div className="popup">
          <h2>Edit Task</h2>
          <a className="close" href="#">
            &times;
          </a>
          <div className="content">
            {isEdit && (
              <AddEditItem
                taskDetails={data}
                onCancel={() => (window.location.href = `#`)}
                onSubmit={onEditTask}
                modalTitle={"Task"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
