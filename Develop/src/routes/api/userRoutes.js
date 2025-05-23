"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.userRouter = router;
const userController_js_1 = require("../../controllers/userController.js");
// /api/users
router.route('/').get(userController_js_1.getAllUsers).post(userController_js_1.createUser);
// /api/users/:userId
router
    .route('/:userId')
    .get(userController_js_1.getUserById)
    .put(userController_js_1.updateUser)
    .delete(userController_js_1.deleteUser);
// /api/users/:userId/friends/:friendId
// This route is used to add or delete a friend for a user
router
    .route('/:userId/friends/:friendId')
    .post(userController_js_1.addFriend)
    .delete(userController_js_1.deleteFriend);
// /api/users/:userId/friends
// This route is used to get all friends of a user
router
    .route('/:userId/friends')
    .get(userController_js_1.getUserFriends)
    .post(userController_js_1.addFriend)
    .delete(userController_js_1.deleteFriend);