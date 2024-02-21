const { Schema, model } = require("mongoose");
const board = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set the board's title"],
    },
    icon: { type: String, required: true },
    background: { type: String },
    filter: {
      type: String,
      enum: ["without", "low", "medium", "high"],
      default: "without",
    },
    columns: [
      {
        title: { type: String, required: true },
        owner: {
          type: Schema.Types.ObjectId,
        },
        cards: [
          {
            title: { type: String, required: true },
            text: { type: String, required: true },
            priority: {
              type: String,
              enum: ["without", "low", "medium", "high"],
              default: "without",
            },
            deadline: { type: String, required: true },
            owner: {
              type: Schema.Types.ObjectId,
              required: true,
            },
          },
        ],
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Board = model("board", board);

module.exports = {
  Board,
};
