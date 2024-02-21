const { Board } = require("./schema");

const getBoardByTitle = (title) => {
  return Board.findOne({ title: title });
};

const getBoardById = (id) => {
  return Board.findOne({ _id: id });
};

const createBoard = (title, icon, background, owner) => {
  return Board.create({ title, icon, background, owner });
};

const deleteBoard = (id) => {
  return Board.findOneAndDelete({ _id: id });
};

const updateBoard = (id, body) => {
  return Board.findOneAndUpdate({ _id: id }, body, { new: true });
};

const updateBoardColumn = (boardId, columnId, body) => {
  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId },
    body
  );
};

module.exports = {
  getBoardByTitle,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardById,
  updateBoardColumn,
};
