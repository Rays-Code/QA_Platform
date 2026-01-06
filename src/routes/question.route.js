import express from 'express';
import * as questionValidator from '../validators/question.validator.js'
import validate from '../validators/validate.js';
import authenticateUser from '../middlewares/authenticate-user.middleware.js';
import { deleteQuestionbyId, getAllQuestion, getQuestionbyId, postNewQuestion } from '../controllers/question.controller.js';

const questionRouter = express.Router();

questionRouter.post('/', questionValidator.questionSchema, validate, authenticateUser, postNewQuestion);
questionRouter.get('/', authenticateUser, getAllQuestion);
questionRouter.get('/:questionId', authenticateUser, getQuestionbyId);
questionRouter.delete('/:questionId', authenticateUser, deleteQuestionbyId);

export default questionRouter;