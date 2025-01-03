const express = require("express");
const multer = require("multer");
const Story = require("../models/Story");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Create a new story
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, subtitle, content, support } = req.body;
    const imagelink = req.file ? req.file.path : null;

    const story = new Story({
      title,
      subtitle,
      content,
      support,
      imagelink,
    });

    await story.save();
    res.status(201).json({ message: "Story created successfully", story });
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ message: "Error creating story", error });
  }
});

// Get all stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ message: "Error fetching stories", error });
  }
});

// Get a specific story by ID
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: "Error fetching story", error });
  }
});

// Increment support for a story
router.put("/:id/support", async (req, res) => {
  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Check if the user has already supported the story
    if (story.supportedBy.includes(uid)) {
      return res.status(400).json({ message: "You have already supported this story" });
    }

    // Increment support and add user ID
    story.support = (story.support || 0) + 1;
    story.supportedBy.push(uid);
    await story.save();

    res.status(200).json({ support: story.support });
  } catch (error) {
    console.error("Error updating support:", error);
    res.status(500).json({ message: "Error updating support", error });
  }
});

// Check if a user has supported a story
router.get("/:id/hasSupported", async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    const hasSupported = story.supportedBy.includes(uid);
    res.status(200).json({ hasSupported });
  } catch (error) {
    console.error("Error checking support status:", error);
    res.status(500).json({ message: "Error checking support status", error });
  }
});

module.exports = router;
