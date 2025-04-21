// ObjectId() method for converting thoughtId string into an ObjectId for querying database
import { ObjectId } from 'mongodb';
import { Thought, User } from '../models/index.js';
// TODO: Create an aggregate function to get the number of thoughts overall
export const headCount = async () => {
    // Your code here
    const numberOfThoughts = await Thought.aggregate()
        .count('thoughtCount')
        .then((numberOfThoughts) => numberOfThoughts[0].thoughtCount);
    return numberOfThoughts;
};
// Aggregate function for getting the overall grade using $avg
export const grade = async (thoughtId) => Thought.aggregate([
    // TODO: Ensure we include only the thought who can match the given ObjectId using the $match operator
    {
        $match: {
            _id: new ObjectId(thoughtId),
        },
    },
    {
        $unwind: '$reactions',
    },
    // TODO: Group information for the thought with the given ObjectId alongside an overall grade calculated using the $avg operator
    {
        $group: {
            _id: new ObjectId(thoughtId),
            averageScore: { $avg: '$reactions.score' },
        },
    },
]);

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
async getAllThoughts (_req, res) { 
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * GET Thought based on id /thoughts/:id
 * @param string id
 * @returns a single Thought object
*/
async getThoughtById (req, res) {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (thought) {
            return res.status(404).json({
                message: 'No thought with this ID'});
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST Thought /thoughts
 * @param object thought
 * @returns a single Thought object
*/
async createThought (req, res) {
    try {
        const thought = await Thought.create(req.body);

        await User.findOneAndUpdate(
            req.body.userId,
            { $push: { thoughts: thought._id } },
            { new: true }
        );
    }
    catch (err) {
        res.status(500).json(err);
    }
};

/**
 * UPDATE Thought based on id /thoughts/:id
 * @param string id
 * @returns string
*/
async updateThought (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            req.params.thoughtId, 
            req.body, 
        {new: true}
    );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }
        catch (err) {
            res.status(500).json(err);
        }
};

/**
 * DELETE Thought based on id /thoughts/:id
 * @param string id
 * @returns string
*/
async deleteThought (req, res) {
    try {
        const thought = await Thought.findOneAndDelete(
            req.params.thoughtId,
    );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID' });
        }
        
        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId }, 
            { $pull: { thoughts: req.params.thoughtId } },
        );

        res.json({message: 'Thought deleted, but no users found'});
    } catch (err) {
        res.status(500).json(err);
    }
    },
};

/**
 * POST Reaction based on /thoughts/:thoughtId/reactions
 * @param string id
 * @param object reaction
 * @returns object thought
*/
async addReaction (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            req.params.thoughtId,
            { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

/**
 * DELETE Reaction based on /thoughts/:thoughtId/reactions
 * @param string reactionId
 * @param string thoughtId
 * @returns object thought
*/
async removeReaction (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
