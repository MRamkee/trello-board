import React, { useState } from "react";

interface INewItem {
  card?: string;
  onSubmit?: (data: any) => void;
  onCancel: () => void;
}
export const AddNewItem = ({ card, onSubmit, onCancel }: INewItem) => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");

  return (
    <>
      <div style={{ backgroundColor: "palegoldenrod" }}>
        <div className="new-item-container">
          <label title="task name"> Task Title </label>
          <input
            type="text"
            name="itemName"
            onChange={(e) => setItemName(e.target.value)}
          />
          <label title="Task description"> Description </label>
          <input
            type="text"
            name="itemDescription"
            onChange={(e) => setItemDesc(e.target.value)}
          />
        </div>
        <button
          disabled={!Boolean(itemName)}
          onClick={() =>
            onSubmit?.({ name: itemName, desc: itemDesc, cardName: card })
          }
        >
          Save
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
};
