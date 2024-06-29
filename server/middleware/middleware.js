import  jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const verify = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, process.env.SECRET_KEY);
        const {username, id} = decodedData;
        req.username = username;
        req.userId = id;
        next();
    } catch (error) {
        console.log(error)
    }
};

export default verify;