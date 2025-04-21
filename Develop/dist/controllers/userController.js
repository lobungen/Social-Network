import { User, Thought } from '../models/index.js';
/**
 * GET All User /user
 * @returns an array of User
*/
module.exports = {
    async getUsers(req, res) {
    try {
        const users = User.find().populate('friends').populate('thoughts');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * GET User based on id /user/:id
 * @param string id
 * @returns a single User object
*/
async getUserById (req, res) {
    try {
        const user = await User.findById(userId);
        .populate('friends').populate('thoughts');
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
* POST User /user
* @param object username
* @returns a single User object
*/
async createUser (req, res) {
    try {
        const newUser = await User.create({
            course
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/**
 * PUT User based on id /user/:id
 * @param object id, username
 * @returns a single User object
*/
async updateUser (req, res) {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(course);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/**
* DELETE User based on id /user/:id
* @param string id
* @returns string
*/
async deleteUser (req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({
                message: 'No user with that ID'
            });
        }
        else {
            await Thought.deleteMany({ _id: { $in: user.thought } });
            res.json({ message: 'User and thought deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * ADD friend on id /user/:id
 * @param object id, username
 * @returns a single User object
*/
async addFriend (req, res) {
    try {
        const user = await User.findByIdAndUpdate({ friends: req.params.userId }, { $addToSet: req.body }, { runValidators: true, new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(course);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

/**
* DELETE User based on id /user/:id
* @param string id
* @returns string
*/
async deleteFriend (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.userId, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true })
        .populate('friends');

        if (!user) {
            res.status(404).json({
                message: 'No user with that ID'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
