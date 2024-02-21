const express = require("express");
const { auth } = require("../../midlewares/auth_midleware");
const router = express.Router();
const mongoose = require("mongoose");
const { updateBoard } = require("../../models/board/board");

router.post("/:boardId", auth, async (req, res, next) => {
  const { boardId } = req.params;

  const newObjectId = new mongoose.Types.ObjectId();
  const input = {
    $push: { columns: { _id: newObjectId, onwer: boardId, ...req.body } },
  };
  await updateBoard(boardId, input);

  res.status(201).json();
});

router.delete("/", auth, async (req, res, next) => {
  const { boardId, columnId } = req.body;
  const updateObject = { $pull: { columns: { _id: columnId } } };
  await updateBoard(boardId, updateObject);

  res.status(200).json();
});

router.get("/", auth, async (req, res, next) => {
  const { boardId } = req.params;

  const { columns } = await getBoardById(boardId);

  const result = columns.map((column) => ({
    title: column.title,
    _id: column._id,
    owner: column.owner,
  }));
  res.status(200).json(result);
});

router.put("/", auth, async (req, res, next) => {
  const { title, boardId, columnId } = req.body;

  const { columns } = await getBoardById(boardId);

  const index = columns.findIndex((column) => column.id === columnId);

  const updatedBoard = await updateBoard(boardId, {
    $set: { [`columns.${index}.title`]: title },
  });

  res.json(updatedBoard.columns[index]);
});

module.exports = router;
