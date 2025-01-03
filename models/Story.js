const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  support: { type: Number, default: 0 },
  imagelink: { type: String },
  supportedBy: { type: [String], default: [] }, // Array to store user IDs
});

module.exports = mongoose.model("Story", StorySchema);
