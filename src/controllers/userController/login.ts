import {RequestHandler} from 'express'
import createError from 'http-errors'
import {sign} from 'jsonwebtoken'
import {compare} from 'bcrypt'

// Models
import { User } from '../../models/users/user'

export const loginUser: RequestHandler = async (req, res, next) => {

    const {email, password} = req.body as {email: string, password: string}

    try {
        
        const foundUser = await User.findOne({email})

        if (!foundUser) {
            return next(createError(400, "User doesn't exist."))
        }

        const result = await compare(password, foundUser!.password)

        if (!result) {
            return next(createError(400, 'Invalid Email/Password.'))
        }

        const token = sign({id: foundUser._id}, process.env.JWT_KEY as string)
        
        return res.status(400).json({
            msg: 'Login Successfully.',
            data: foundUser,
            token
        })

    } catch (err) {
        next(createError(400, 'Something happened.'))
    }

}