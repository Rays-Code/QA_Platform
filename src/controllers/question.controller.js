import Question from "../models/question.model.js";
import User from "../models/user.model.js";

export const postNewQuestion = async (req, res) => {
    const body = req.body;
    const userId = req.userId

    const userExists = await User.findOne({ _id: userId });
    if(!userExists){
        return res.status(404).json({
            msg: "You cannot post question as your account doesn't exists"
        })
    };

    const newQuestion = await Question.create({
        title: body.title,
        description: body.description,
        author: userId
    });

    return res.status(201).json({
        msg: `Your question has been created at question id: ${newQuestion._id}`,
        question: newQuestion
    });
}

export const getAllQuestion = async (req, res) => {
    const userId = req.userId
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const userExists = await User.findOne({ _id: userId });
    if(!userExists){
        return res.status(404).json({
            msg: "You cannot get all questions as your account doesn't exists"
        })
    };

    const questions = await Question.aggregate([
        {
            $lookup: {
                from: 'answers',
                localField: '_id',
                foreignField: 'question_id',
                as: 'answers'
            }
        },
        {
            $addFields: {
                answerCount: { $size: '$answers' }
            }
        },
        {
            $project: {
                answers: 0
            }
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);

    const totalQuestions = await Question.countDocuments();

    return res.status(200).json({
        success: true,
        page,
        limit,
        totalPages: Math.ceil(totalQuestions/limit),
        totalQuestions,
        questions: questions
    });
};

export const getQuestionbyId = async (req, res) => {
    const questionId = req.params.questionId;

    const questionExists = await Question.findOne({ _id: questionId });
    if(!questionExists){
        return res.status(404).json({
            msg: `Question with question id: ${questionId} doesn't exists, try another one.`
        })
    };

    return res.status(200).json({
        msg: `Fetched the below question for question id: ${questionId}`,
        question: questionExists
    });
}

export const deleteQuestionbyId = async (req, res) => {
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

    await Question.deleteOne({ _id: questionId });

    return res.status(204).json({
        msg: `Deleted the below question for question id: ${questionId}`,
        question: questionExists
    });
}