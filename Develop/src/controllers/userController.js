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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const index_js_1 = require("../models/index.js");
/**
 * GET All Users /users
 * @returns an array of Users
*/
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield index_js_1.User.find()
            .populate("friends")
            .populate("thoughts");
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.getAllUsers = getAllUsers;
/**
 * GET User based on id /user/:id
 * @param string id
 * @returns a single User object
*/
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const thought = yield index_js_1.User.findById(userId)
            .populate("friends")
            .populate("thoughts");
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'Volunteer not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.getUserById = getUserById;
/**
* POST User /users
* @param object username
* @returns a single User object
*/
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    try {
        const newUser = yield index_js_1.User.create({
            user
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});
exports.createUser = createUser;
/**
 * PUT User based on id /users/:id
 * @param object id, username
 * @returns a single User object
*/
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});
exports.updateUser = updateUser;
/**
* DELETE User based on id /users/:id
* @param string id
* @returns string
*/
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield index_js_1.User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({
                message: 'No user with that ID'
            });
        }
        else {
            yield index_js_1.Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
exports.deleteUser = deleteUser;
