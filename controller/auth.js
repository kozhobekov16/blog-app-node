import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwtToken from 'jsonwebtoken'
import {jwtSecret} from "../utils/consts.js";

export const register = async (req, res) => {
    try {
        const {username, password} = req.body
        const isUser = await User.findOne({username})
        if (isUser) {
            res.json({message: `Данный пользователь под именем ${username} уже зарегистрирован`})
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            password: hash
        })
        await newUser.save()
        res.json({
            newUser,
            message: 'Регистрация прошла успешно!'
        })
    } catch (e) {
        res.json({message: `Ошибка при создании пользователя код: ${e}`})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.json({message: 'Такого пользователя уже существует!'})
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            return res.json({message: 'Неверный пароль или логин!'})
        }

        const token = jwtToken.sign({
            id: user._id
        }, jwtSecret, {expiresIn: '30d'})
        res.json({
            jwtToken: token,
            user,
        })
    } catch (e) {
        res.json({
            message: `Не удалось войти ${e}`
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            res.json({message: 'нет доступа!'})
        }

        const token = jwtToken.sign({
            id: user._id,
        }, jwtSecret, {expiresIn: '30d'})

        res.json({
            user,
            token
        })
    } catch (e) {
        return res.json({
            message: `нет доступа! ${e}`
        })
    }
}