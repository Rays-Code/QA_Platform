import express from 'express';
import * as userValidator from '../validators/user.validator.js'
import validate from '../validators/validate.js'
import { loginUser, registerUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', userValidator.registerUserSchema, validate, registerUser);
userRouter.post('/login', userValidator.loginUserSchema, validate, loginUser);

export default userRouter;