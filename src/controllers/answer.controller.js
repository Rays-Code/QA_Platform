import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";
import User from "../models/user.model.js";

export const postNewAnswer = async (req, res) => {
    const body = req.body;

    const userId = req.userId;
    const questionId = req.params.questionId;

    const userExists = await User.findOne({ _id: userId });
    if(!userExists){
        return res.status(404).json({
            msg: "You cannot post new answer as your account doesn't exists"
        })
    };

    const questionExists = await Question.findOne({ _id: questionId });
        if(!questionExists){
            return res.status(404).json({
                msg: `Question with question id: ${questionId} doesn't exists, try another one.`
            })
        };


    const newAnswer = await Answer.create({
        author: userId,
        text: body.text,
        question_id: questionId
    });

    return res.status(201).json({
        msg: `Your new answer has been posted for question id: ${questionId}`,
        answer: newAnswer
    })
}

export const getAllAnswersByQuestionId = async (req, res) => {
    const userId = req.userId;
    const questionId = req.params.questionId;

    const userExists = await User.findOne({ _id: userId });
    if(!userExists){
        return res.status(404).json({
            msg: "You cannot get all answers as your account doesn't exists"
        })
    };

    const questionExists = await Question.findOne({ _id: questionId });
        if(!questionExists){
            return res.status(404).json({
                msg: `Question with question id: ${questionId} doesn't exists, try another one.`
            })
        };

    const allAnswers = await Answer.find({ question_id: questionId });

    return res.status(200).json({
        msg: `Found the below answers for question with question id: ${questionId}`,
        allAnswers: allAnswers
    })
};

export const deleteAnswerByAnswerId = async (req, res) => {
    const userId = req.userId;
    const answerId = req.params.answerId;

    const userExists = await User.findOne({ _id: userId });
    if(!userExists){
        return res.status(404).json({
            msg: "You cannot get all answers as your account doesn't exists"
        })
    };

    const answerExists = await Answer.findOne({ _id: answerId });
        if(!answerExists){
            return res.status(404).json({
                msg: `Answer with answer id: ${answerId} doesn't exists, try another one.`
            })
        };

    await Answer.deleteOne({ _id: answerId });

    return res.status(204).json({
        msg: `Deleted the below answer for answer id: ${answerId}`,
        answer: answerExists
    })
}