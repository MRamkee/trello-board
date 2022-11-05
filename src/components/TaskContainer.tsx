/* eslint-disable jsx-a11y/anchor-is-valid */
import { Data } from "../interfaces";

interface Props {
  data: Data;
  handleDragging: (dragging: boolean) => void;
}

export const CardItem = ({ data, handleDragging }: Props) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", `${data.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);

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
          <p className="close">x</p>
        </div>

        <p>{data.content}</p>
        <p>{data.desc}</p>

        <div>
          <p
            className="edit"
            onClick={() => (window.location.href = `#${data.id}`)}
          >
            Edit
          </p>
        </div>
      </div>

      {/** Task Details Modal  */}
      <div id={data.id.toString()} className="overlay">
        <div className="popup">
          <h2>{data.content}</h2>
          <a className="close" href="#">
            &times;
          </a>
          <div className="content">{data.desc}</div>
        </div>
      </div>
    </>
  );
};
