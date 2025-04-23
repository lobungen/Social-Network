// ObjectId() method for converting thoughtId string into an ObjectId for querying database
//import { ObjectId } from 'mongodb';
import { Thought, User } from '../models/index.js';
/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        const thoughtObj = {
            thoughts,
        };
        res.json(thoughtObj);
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
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json({
                thought,
            });
        }
        else {
            res.status(404).json({
                message: 'Thought not found'
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
 * POST Thought /thoughts
 * @param object thought
 * @returns a single Thought object
*/
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
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
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No such thought exists' });
        }
        const user = await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        if (!user) {
            res.status(404).json({
                message: 'Thought deleted, but no users found',
            });
        }
        res.json({ message: 'Thought successfully deleted' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
/**
 * POST Reaction based on /thoughts/:thoughtId/reactions
 * @param string id
 * @param object reaction
 * @returns object thought
*/
export const addReaction = async (req, res) => {
    console.log('You are adding an reaction');
    console.log(req.body);
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
/**
 * DELETE Reaction based on /thoughts/:thoughtId/reactions
 * @param string reactionId
 * @param string thoughtId
 * @returns object thought
*/
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
