import { RequestHandler } from 'express'
import createError from 'http-errors'
import {sign} from 'jsonwebtoken'
import { hash } from 'bcrypt'

// Models
import { User } from '../../models/users/user'
import { Note } from '../../models/notes/notes'

export const registerUser: RequestHandler = async (req, res, next) => {

    const {firstName, lastName, email, password, pincode} = req.body as {firstName: string, lastName: string, email: string, password: string, pincode: string}

    try {

        if (password.length < 5) {
            return next(createError(400, 'Password must be 5 characters long.'))
        }

        if (pincode.length < 5) {
            return next(createError(400, 'Pincode must be 5 characters long.'))
        }

        const hashedPassword = await hash(password, 10)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            pincode
        })

        await newUser.save()

        const dummyNote1 = new Note({
            title: "Welcome to Lorem-Notes!",
            content: "Where you can create notes, keep track and be able to edit, and delete notes!",
            isSecret: false,
            isDone: false
        })

        const dummyNote2 = new Note({
            title: "You can also create a secret notes!",
            content: "It is encrypted and decrypted when you go to secret notes page PIN is required :)",
            isSecret: false,
            isDone: false
        })

        const dummyNote3 = new Note({
            title: Buffer.from("Welcome to the secrets area!", process.env.ENCODE_1 as BufferEncoding).toString(process.env.ENCODE_2 as BufferEncoding),
            content: Buffer.from("Where you can create a secret to yourself. :p shhhhhhhh!", process.env.ENCODE_1 as BufferEncoding).toString(process.env.ENCODE_2 as BufferEncoding),
            isSecret: true,
            isDone: false
        })

        await dummyNote1.save(), dummyNote2.save(), dummyNote3.save()

        await User.findOneAndUpdate({_id: newUser._id}, {
            $addToSet: {
                myNotes: { $each : [dummyNote1, dummyNote2, dummyNote3] }
            }
        })

        const token = sign({id: newUser._id}, process.env.JWT_KEY as string)

        return res.status(200).json({
            data: newUser,
            token
        })
        
    } catch (err) {

        if (err.code === 11000) {
            return next(createError(400, 'Email/Username already exist.'))
        }

        next(createError(400, err))

    }

}