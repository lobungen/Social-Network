import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    name: string,
    inPerson: boolean,
    start: Date,
    end: Date,
    thoughts: Schema.Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        inPerson: {
            type: Boolean,
            default: true,
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
                ref: 'thought',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const User = model<IUser>('User', userSchema);

export default User;
