import { Router } from 'express';
const router = Router();
import { getAllUser, getUserById, createUser, updateUser, deleteUser, } from '../../controllers/userController.js';

// /api/user
router.route('/').get(getAllUser).post(createUser);

// /api/user/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
export { router as userRouter };

// /api/user/:userId/friends/:friendId
const { addFriend, removeFriend } = require('../../controllers/userController.js');

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);