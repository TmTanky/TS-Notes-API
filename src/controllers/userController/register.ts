import { RequestHandler } from 'express'
import createError from 'http-errors'
import {sign} from 'jsonwebtoken'
import { hash } from 'bcrypt'

// Models
import { User } from '../../models/users/user'

export const registerUser: RequestHandler = async (req, res, next) => {

    const {firstName, lastName, email, password} = req.body as {firstName: string, lastName: string, email: string, password: string}

    try {

        if (password.length < 5) {
            return next(createError(400, 'Password must be 5 characters long.'))
        }

        const hashedPassword = await hash(password, 10)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        await newUser.save()

        const token = sign({id: newUser._id}, process.env.JWT_KEY as string)

        return res.status(200).json({
            msg: 'Successfully Registered.',
            data: newUser,
            token
        })
        
    } catch (err) {

        if (err.code === 11000) {
            return next(createError(400, 'Email already exist.'))
        }

        next(createError(400, err))

    }

}