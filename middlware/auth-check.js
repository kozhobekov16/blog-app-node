import jwt from 'jsonwebtoken'
import {jwtSecret} from "../utils/consts.js";

export const getMeMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token){
        return next()
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.userId = decoded
        next()
    }catch (e){
        console.log(e)
    }
}