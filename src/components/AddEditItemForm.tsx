import React, { useState } from "react";
import { Data } from "../types/interfaces";

interface INewItem {
  card?: string;
  onSubmit?: (data: any) => void;
  onCancel: () => void;
  taskDetails?: Data;
  modalTitle?: string;
}

export const AddEditItem = ({
  card,
  onSubmit,
  onCancel,
  taskDetails,
  modalTitle
}: INewItem) => {
  const [itemName, setItemName] = useState(taskDetails?.content || "");
  const [itemDesc, setItemDesc] = useState(taskDetails?.desc || "");

  const onSave = () => {
    onSubmit?.({
      content: itemName,
      desc: itemDesc,
      cardName: taskDetails?.cardName,
      id: taskDetails?.id
    });

    // Clear the data after we save the information
    setTimeout(() => {
      setItemName("");
      setItemDesc("");
    }, 0);
  };

  return (
    <>
      <div style={{ backgroundColor: "#FFD8D8" }}>
        <div className="new-item-container">
          <div className="form-field">
            <label title="name" data-testid="modal-title">
              {modalTitle} Name
            </label>
            <input
              type="text"
              name="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label title="Task Assignee">
              {modalTitle === "Task" ? `Assignee` : `Description`}
            </label>
            <input
              type="text"
              name="itemDescription"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="form-footer">
        <button
          disabled={!Boolean(itemName)}
          onClick={onSave}
          className="footer-buttons"
        >
          Save
        </button>
        <button onClick={onCancel} className="footer-buttons">
          Cancel
        </button>
      </div>
    </>
  );
};
