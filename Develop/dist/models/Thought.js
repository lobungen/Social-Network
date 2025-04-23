import { Schema, Types, model } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
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
const thoughtSchema = new Schema({
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
const Thought = model('Thought', thoughtSchema);
export default Thought;
