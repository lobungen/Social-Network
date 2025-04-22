"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    },
}, {
    timestamps: true,
    _id: false
});
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        min_length: 1,
    },
    createAt: {
        type: Date,
        default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
    },
    timestamps: true
});
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
exports.default = Thought;
