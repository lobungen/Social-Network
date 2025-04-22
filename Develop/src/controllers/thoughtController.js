"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.createThought = exports.getThoughtById = exports.getAllThoughts = void 0;
const index_js_1 = require("../models/index.js");
/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
*/
const getAllThoughts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield index_js_1.Thought.find();
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
});
exports.getAllThoughts = getAllThoughts;
/**
 * GET Thought based on id /thoughts/:id
 * @param string id
 * @returns a single Thought object
*/
const getThoughtById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId } = req.params;
    try {
        const thought = yield index_js_1.Thought.findById(thoughtId);
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
});
exports.getThoughtById = getThoughtById;
/**
 * POST Thought /thoughts
 * @param object thought
 * @returns a single Thought object
*/
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield index_js_1.Thought.create(req.body);
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createThought = createThought;
/**
 * DELETE Thought based on id /thoughts/:id
 * @param string id
 * @returns string
*/
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield index_js_1.Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No such thought exists' });
        }
        const user = yield index_js_1.User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
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
});
exports.deleteThought = deleteThought;
/**
 * POST Reaction based on /thoughts/:thoughtId/reactions
 * @param string id
 * @param object reaction
 * @returns object thought
*/
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('You are adding an reaction');
    console.log(req.body);
    try {
        const thought = yield index_js_1.Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
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
});
exports.addReaction = addReaction;
/**
 * DELETE Reaction based on /thoughts/:thoughtId/reactions
 * @param string reactionId
 * @param string thoughtId
 * @returns object thought
*/
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield index_js_1.Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
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
});
exports.removeReaction = removeReaction;
