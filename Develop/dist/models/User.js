import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please fill a valid email address'],
    },
    start: {
        type: Date,
        default: Date.now(),
    },
    end: {
        type: Date,
        // Sets a default value of 12 weeks from now
        default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
const User = model('User', userSchema);
export default User;
