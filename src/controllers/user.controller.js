import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    const body = req.body;

    const userExists = await User.findOne({ email: body.email });
    if(userExists){
        return res.status(400).json({
            message: "Your account already exists, Login!"
        });
    };

    const Salt = await bcrypt.genSalt(10);
    const Password_Hash = await bcrypt.hash(body.password, Salt);

    const newUser = await User.create({ name: body.name, email: body.email, password: Password_Hash});

    const token = 'Bearer ' + jwt.sign({ userId: newUser._id }, process.env.JWT_KEY);

    return res.status(201).json({
        msg: "Your account has been created.",
        token: token,
        user: newUser,
    });
}

export const loginUser = async (req, res) => {
    const body = req.body;

    const userExists = await User.findOne({ email: body.email });
    if(!userExists){
        return res.status(400).json({
            message: "Your account doesn't exists, Sign up!"
        });
    };

    const Password_Match = bcrypt.compare(body.password, userExists.password);
    if(!Password_Match){
        return res.status(400).json({
            msg: "Invalid password"
        })
    }

    const token = 'Bearer ' + jwt.sign({ userId: userExists._id }, process.env.JWT_KEY);

    return res.status(200).json({
        token: token,
        user: userExists
    });    
}