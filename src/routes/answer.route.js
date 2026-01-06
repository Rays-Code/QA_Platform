import express from 'express';
import authenticateUser from '../middlewares/authenticate-user.middleware.js';
import { deleteAnswerByAnswerId, getAllAnswersByQuestionId, postNewAnswer } from '../controllers/answer.controller.js';

const answerRouter = express.Router();

answerRouter.post('/:questionId', authenticateUser, postNewAnswer);
answerRouter.get('/:questionId', authenticateUser, getAllAnswersByQuestionId);
answerRouter.delete('/:answerId', authenticateUser, deleteAnswerByAnswerId);

export default answerRouter;