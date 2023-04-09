import {Router} from 'express'
import {login, register} from "../controller/index.js";
import {getMe} from "../controller/auth.js";
import {getMeMiddleware} from "../middlware/auth-check.js";

export const authRoutes  = new Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/getMe', getMeMiddleware, getMe)