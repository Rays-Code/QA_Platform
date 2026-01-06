import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import questionRouter from "./routes/question.route.js";
import answerRouter from "./routes/answer.route.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', userRouter);
app.use('/api/questions', questionRouter);
app.use('/api/answers', answerRouter);

app.use((err, res, req, next) => {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!"});
})


export default app;