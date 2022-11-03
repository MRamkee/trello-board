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
    <div
      className="grid-item"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      key={data.id}
    >
      <p>{data.content}</p>
    </div>
  );
};
