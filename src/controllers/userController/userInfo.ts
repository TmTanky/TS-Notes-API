import {RequestHandler} from 'express'
import createError from 'http-errors'
import {Buffer} from 'buffer'

// Models
import {User} from '../../models/users/user'

export const getUserNotes: RequestHandler = async (req, res, next) => {

    const {userID} = req.params as {userID: string}

    try {

        const user = await User.findOne({_id: userID}).populate('myNotes')
        const usersNotes = user?.myNotes.filter(item => item.isSecret === false)

        return res.status(200).json({
            status: res.status,
            data: usersNotes
        })
        
    } catch (err) {
        next(createError(400, err))
    }

}

export const getUserSecretNotes: RequestHandler = async (req, res, next) => {

    const {userID} = req.params as {userID: string}

    try {

        const user = await User.findOne({_id: userID}).populate('myNotes').populate('noteBy')
        const usersNotes = user?.myNotes.filter(item => item.isSecret === true).map(item => {
            return ({
                _id: item._id,
                title: Buffer.from(item.title, process.env.ENCODE_2 as BufferEncoding).toString(process.env.ENCODE_1 as BufferEncoding),
                content: Buffer.from(item.content, process.env.ENCODE_2 as BufferEncoding).toString(process.env.ENCODE_1 as BufferEncoding),
                isDone: item.isDone,
                isSecret: item.isSecret,
                noteBy: item.noteBy
            })
        })

        return res.status(200).json({
            status: res.status,
            data: usersNotes
        })
        
    } catch (err) {
        next(createError(400, err))
    }

}