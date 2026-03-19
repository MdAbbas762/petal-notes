const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 150
    },

    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 1500
    }, 

    category: {
        type: String,
        required: true,
    },

    isTrashed: {
        type: Boolean,
        default: false
    },

    isPinned: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);