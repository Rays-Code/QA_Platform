import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
    const authorization = req.headers["authorization"];

    if(!authorization || !authorization.startsWith("Bearer ")){
        return res.status(401).json({
            message: "Unauthorized, invalid token"
        })
    };

    const token = authorization.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.userId;
        next();
    } catch(err){
        console.error("Verification failed", err)
        return res.status(403).json({
            message: "Verification failed"
        })
    }
}

export default authenticateUser;