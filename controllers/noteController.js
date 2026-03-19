const noteModel = require("../models/noteModel");
const userModel = require("../models/userModel");
const AppError = require("../utils/appError");

function showHomePage(req, res, next) {
    res.render("home");
}

async function showDashboard(req, res, next) {
    const userId = req.user.id;
    const searchQuery = req.query.search?.trim();

    let notes;

    try {
        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");

            notes = await noteModel.find({
                userId: userId,
                isTrashed: false,
                $or: [
                    { title: searchRegex },
                    { description: searchRegex },
                ]
            }).sort({ isPinned: -1, createdAt: -1 });

        } else {
            notes = await noteModel.find({ userId: userId, isTrashed: false }).sort({ isPinned: -1, createdAt: -1 });
        }

        const user = await userModel.findOne({ _id: userId });

        if (notes.length === 0) {
            return res.render("notes/dashboard", { userNotes: [], userName: user.name, hasNotes: false, noteCount: 0, searchQuery: searchQuery });
        }

        const totalNotes = notes.length;
        return res.render("notes/dashboard", { userNotes: notes, userName: user.name, hasNotes: true, noteCount: totalNotes, searchQuery: searchQuery });

    } catch (error) {
        next(error);
    }
}

function showCreateNote(req, res, next) {
    res.render("notes/createNote", { error: null });
}

async function createNote(req, res, next) {
    req.errorPage = "notes/createNote";

    const { title, description, category } = req.body;

    const userID = req.user.id;

    const noteTitle = title?.trim();
    const noteDescription = description?.trim();

    try {
        if (!noteTitle || !noteDescription || !category) {
            throw new AppError("All fields required.", 400);
        }

        await noteModel.create({
            userId: userID,
            title,
            description,
            category: category
        });

        res.redirect("/petal/notes/dashboard");

    } catch (error) {
        return next(error);
    }
}

async function showEditNote(req, res, next) {
    const noteId = req.params.id;
    const userId = req.user.id;
    const path = req.query.redirectTo;

    try {
        const note = await noteModel.findOne({ _id: noteId, userId: userId });
        return res.render("notes/editNote", { userNote: note, redirectPath: path, error: null });

    } catch (error) {
        return next(error);
    }
}

async function updateNote(req, res, next) {
    req.errorPage = "notes/editNote";

    const { title, description, category } = req.body;

    const noteId = req.params.id;
    const userId = req.user.id;
    const path = req.query.redirectTo;

    const noteTitle = title?.trim();
    const noteDescription = description?.trim();

    try {
        const note = await noteModel.findOne({ _id: noteId, userId });

        req.note = note;
        req.redirectPath = path;

        if (!noteTitle || !noteDescription || !category) {
            throw new AppError("All fields required.", 400);
        }

        const updates = {
            title: noteTitle,
            description: noteDescription,
            category: category
        };

        const updatedNote = await noteModel.findOneAndUpdate(
            { _id: noteId, userId: userId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            throw new AppError("No note found", 404);
        }

        return res.redirect(path);

    } catch (error) {
        next(error);
    }
}

async function moveToTrash(req, res, next) {
    const noteId = req.params.id;
    const userId = req.user.id;
    const path = req.query.redirectTo;

    try {
        await noteModel.findOneAndUpdate({ _id: noteId, userId: userId }, { $set: { isTrashed: true } });
        return res.redirect(path);

    } catch (error) {
        next(error);
    }
}

async function showTrashPage(req, res, next) {
    const userId = req.user.id;

    try {
        const notes = await noteModel.find({ userId: userId, isTrashed: true });
        const user = await userModel.findOne({ _id: userId });

        if (notes.length == 0) {
            return res.render("notes/trash", { userNotes: [], userName: user.name, hasNotes: false });
        }

        return res.render("notes/trash", { userNotes: notes, userName: user.name, hasNotes: true });

    } catch (error) {
        next(error);
    }
}

async function deleteNote(req, res, next) {
    const noteId = req.params.id;
    const userId = req.user.id;

    try {
        const deletedNote = await noteModel.findOneAndDelete({ _id: noteId, userId: userId });

        if (!deletedNote) {
            throw new AppError("Note not found", 404);
        }

        return res.redirect("/petal/notes/trash");

    } catch (error) {
        next(error);
    }
}

async function restoreNote(req, res, next) {
    const noteId = req.params.id;
    const userId = req.user.id;

    try {
        await noteModel.findOneAndUpdate({ _id: noteId, userId: userId }, { $set: { isTrashed: false } });

        return res.redirect("/petal/notes/trash");

    } catch (error) {
        next(error);
    }
}

async function showWorkPage(req, res, next) {
    const userId = req.user.id;

    try {
        const user = await userModel.findOne({ _id: userId });

        const notes = await noteModel.find({ userId: userId, category: "Work", isTrashed: false }).sort({ isPinned: -1, createdAt: -1 });

        if (notes.length == 0) {
            return res.render("notes/workNotes", { userNotes: [], userName: user.name, hasNotes: false });
        }

        return res.render("notes/workNotes", { userNotes: notes, userName: user.name, hasNotes: true });

    } catch (error) {
        next(error);
    }
}

async function showIdeasPage(req, res, next) {
    const userId = req.user.id;

    try {
        const user = await userModel.findOne({ _id: userId });

        const notes = await noteModel.find({ userId: userId, category: "Ideas", isTrashed: false }).sort({ isPinned: -1, createdAt: -1 });

        if (notes.length == 0) {
            return res.render("notes/ideasNotes", { userNotes: [], userName: user.name, hasNotes: false });
        }

        return res.render("notes/ideasNotes", { userNotes: notes, userName: user.name, hasNotes: true });

    } catch (error) {
        next(error);
    }
}

async function showPersonalPage(req, res, next) {
    const userId = req.user.id;

    try {
        const user = await userModel.findOne({ _id: userId });

        const notes = await noteModel.find({ userId: userId, category: "Personal", isTrashed: false }).sort({ isPinned: -1, createdAt: -1 });

        if (notes.length == 0) {
            return res.render("notes/personalNotes", { userNotes: [], userName: user.name, hasNotes: false });
        }

        return res.render("notes/personalNotes", { userNotes: notes, userName: user.name, hasNotes: true });

    } catch (error) {
        next(error);
    }
}

async function pinNote(req, res, next) {
    const noteId = req.params.id;
    const userId = req.user.id;
    const path = req.query.redirectTo;

    try {
        const note = await noteModel.findOne({ _id: noteId, userId: userId });

        if (note.isPinned == false) {
            await noteModel.updateOne({ _id: noteId, userId: userId }, { $set: { isPinned: true } });
        } else {
            await noteModel.findOneAndUpdate({ _id: noteId, userId: userId }, { $set: { isPinned: false } });
        }

        return res.redirect(path);
    } catch (error) {
        next(error);
    }
}

async function showPinnedNotesPage(req, res, next) {
    const userId = req.user.id;

    try {
        const notes = await noteModel.find({ userId: userId, isTrashed: false, isPinned: true });
        const user = await userModel.findOne({ _id: userId });

        if (notes.length == 0) {
            return res.render("notes/pinnedNotes", { userNotes: [], userName: user.name, hasNotes: false });
        }

        return res.render("notes/pinnedNotes", { userNotes: notes, userName: user.name, hasNotes: true });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    showHomePage,
    showDashboard,
    showCreateNote,
    createNote,
    showEditNote,
    updateNote,
    moveToTrash,
    showTrashPage,
    deleteNote,
    restoreNote,
    showWorkPage,
    showIdeasPage,
    showPersonalPage,
    pinNote,
    showPinnedNotesPage
};