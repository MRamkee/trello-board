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
      <div style={{ backgroundColor: "#FFD8D8" }}>
        <div className="new-item-container">
          <div className="form-field">
            <label title="task name"> Task Title </label>
            <input
              type="text"
              name="itemName"
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label title="Task description"> Description </label>
            <input
              type="text"
              name="itemDescription"
              onChange={(e) => setItemDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="form-footer">
          <button
            disabled={!Boolean(itemName)}
            onClick={() =>
              onSubmit?.({ name: itemName, desc: itemDesc, cardName: card })
            }
            className="footer-buttons"
          >
            Save
          </button>
          <button onClick={onCancel} className="footer-buttons">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
