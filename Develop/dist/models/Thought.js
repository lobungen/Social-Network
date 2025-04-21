import { Schema, Types, model } from 'mongoose';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).formatted('MMMM Do YYYY, h:mm:ss a'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
});

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).formatted('MMMM Do YYYY, h:mm:ss a'),
    }
}, {
    toJSON: {
        getters: true,
    },
    id: false
});

const Thought = model('Thought', thoughtSchema);

export default Thought;
