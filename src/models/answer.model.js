import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    text: {
        type: String,
        required: true
    },
    upvote_count: {
        type: Number,
        default: 0
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        index: true
    }
}, { timestamps: true });

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;