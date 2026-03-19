const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { showHomePage, showDashboard, showCreateNote, createNote, showEditNote, updateNote, moveToTrash, showTrashPage, deleteNote, restoreNote, showWorkPage, showIdeasPage, showPersonalPage, pinNote, showPinnedNotesPage } = require("../controllers/noteController");

const router = express.Router();

// Static routes first
router.get("/home", showHomePage);

router.get("/dashboard", authMiddleware, showDashboard);

router.get("/new", authMiddleware, showCreateNote);
router.post("/", authMiddleware, createNote);

router.get("/work", authMiddleware, showWorkPage);
router.get("/ideas", authMiddleware, showIdeasPage);
router.get("/personal", authMiddleware, showPersonalPage);

router.get("/trash", authMiddleware, showTrashPage);

router.get("/pinned", authMiddleware, showPinnedNotesPage);

// Dynamic routes last
router.get("/:id/edit", authMiddleware, showEditNote);
router.post("/:id", authMiddleware, updateNote);

router.post("/:id/trash", authMiddleware, moveToTrash);
router.post("/:id/delete", authMiddleware, deleteNote);
router.post("/:id/restore", authMiddleware, restoreNote);
router.post("/:id/pin", authMiddleware, pinNote);

module.exports = router;