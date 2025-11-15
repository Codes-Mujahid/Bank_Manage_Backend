import express from 'express';
import { addUser, getUsers, deleteUser, depositUser, withdrawUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/add', addUser);
userRouter.get('/get_users', getUsers);
userRouter.post('/delete', deleteUser);
userRouter.post('/deposit', depositUser);
userRouter.post('/withdraw', withdrawUser);

export default userRouter;