export const NavHeader = () => {
  const handleAddNewBoardClick = (e) => {
    window.location.href = "#new-board";
  };

  const handleResetBoardClick = (e) => {
    localStorage.setItem("items", JSON.stringify([]));
    localStorage.setItem("cards", JSON.stringify([]));
    window.location.reload();
  };

  return (
    <div className="title">
      <h1>Trello Board</h1>
      <div className="dropdown">
        <button className="btn" onClick={handleAddNewBoardClick}>
          + Add new board
        </button>
        <button className="btn" onClick={handleResetBoardClick}>
          ⟳ Reset the board
        </button>
      </div>
    </div>
  );
};
