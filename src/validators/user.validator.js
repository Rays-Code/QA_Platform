import { body } from "express-validator";


export const registerUserSchema = [
    body('name')
    .notEmpty()
    .withMessage('Name is required'),

    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
]

export const loginUserSchema = [
    body('email')
    .isEmail()
    .withMessage('Invalid email'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
]