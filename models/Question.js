const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  user: Object,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  votedUsers: { type: Map, of: String }, // Tracks user votes ('up' or 'down')
});

module.exports = mongoose.model("Questions", QuestionSchema);
