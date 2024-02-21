const express = require("express");
const { auth } = require("../../midlewares/auth_midleware");
const router = express.Router();
const mongoose = require("mongoose");
const { getBoardById, updateBoardColumn } = require("../../models/board/board");

router.post("/:boardId", auth, async (req, res, next) => {
  const { boardId } = req.params;
  const { owner } = req.body;
  const newObjectId = new mongoose.Types.ObjectId();
  const { columns } = getBoardById(boardId);
  const column = columns.find((column) => column.id === owner);
  const updateObject = {
    $push: {
      "columns.$.cards": { _id: newObjectId, owner, ...req.body },
    },
  };

  const updatedObject = await updateBoardColumn(
    boardId,
    column.id,
    updateObject
  );

  const result = updatedObject.columns
    .find((column) => column.id === owner)
    .cards.find((card) => card._id.toString() === newObjectId.toString());

  res.status(201).json(result);
});

router.delete("/:boardId", auth, async (req, res, next) => {
  const { boardId } = req.params;
  const { cardId } = req.body;
  const { owner } = req.body;

  const { columns } = await getBoardById(boardId);
  const column = columns.find((column) => column.id === owner);

  const updateObject = {
    $pull: {
      "columns.$.cards": { _id: cardId },
    },
  };
  await updateBoardColumn(boardId, column.id, updateObject);
  res.status(200).json();
});

module.exports = router;
