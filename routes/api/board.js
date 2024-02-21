const express = require("express");
const { auth } = require("../../midlewares/auth_midleware");
const {
  getBoardByTitle,
  createBoard,
  deleteBoard,
  getBoardById,
  updateBoard,
} = require("../../models/board/board");
const router = express.Router();

router.post("/", auth, async (req, res, next) => {
  const { _id } = req.user;
  const { title, icon, background } = req.body;

  const board = await getBoardByTitle(title);

  if (board) {
    res.status(409).json({
      message: "Conflict",
    });
  }

  const result = await createBoard(title, icon, background, _id);

  res.status(201).json(result);
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  await deleteBoard(id);

  res.status(200).json();
});

module.exports = router;
