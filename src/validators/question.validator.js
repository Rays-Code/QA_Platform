import { body } from  "express-validator";

export const questionSchema = [
    body('title')
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty'),

    body('description')
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty')
]