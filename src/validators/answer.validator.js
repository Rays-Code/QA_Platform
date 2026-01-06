import { body } from  "express-validator";

export const answerSchema = [
    body('text')
    .trim()
    .notEmpty()
    .withMessage('Answer body cannot be empty'),
]