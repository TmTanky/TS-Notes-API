import {RequestHandler} from 'express'
import createError from 'http-errors'
import {Buffer} from 'buffer'

// Models
import {Note} from '../../models/notes/notes'
import {User} from '../../models/users/user'

export const createNote: RequestHandler = async (req, res, next) => {

    const {userID} = req.params as {userID: string}
    const {title, content, isSecret} = req.body as {title: string, content: string, isSecret: boolean}

    try {

        if (isSecret) {
            
            const buffTitle = Buffer.from(title, 'utf-8')
            const buffContent = Buffer.from(content, 'utf-8')
            
            const secretNote = new Note({
                title: buffTitle.toString('base64'),
                content: buffContent.toString('base64'),
                noteBy: userID,
                isSecret
            })

            await secretNote.save()

            await User.findOneAndUpdate({_id: userID},{
                $addToSet: {
                    myNotes: secretNote._id
                }
            })

            return res.status(201).json({
                status: res.status,
                msg: "Successfully created.",
                data: secretNote
            })

        }

        const newNote = new Note({
            title,
            content,
            noteBy: userID,
            isSecret
        })

        await newNote.save()

        await User.findOneAndUpdate({_id: userID},{
            $addToSet: {
                myNotes: newNote._id
            }
        })

        return res.status(201).json({
            status: res.status,
            msg: "Successfully created.",
            data: newNote
        })
        
    } catch (err) {
        next(createError(400, err))
    }

}

export const editNote: RequestHandler = async (req, res, next) => {

    const {noteID} = req.params as {noteID: string}
    const {title, content} = req.body as {title: string, content: string}

    try {

        const editedNote = await Note.findOneAndUpdate({_id: noteID},{
            title,
            content
        }, {new: true})

        return res.status(200).json({
            status: res.status,
            msg: 'Noted edited.',
            data: editedNote
        })
        
    } catch (err) {
        next(createError(400, err))
    }

}

export const toggleDoneNote: RequestHandler = async (req, res, next) => {

    const {noteID} = req.params as {noteID: string}

    try {

        const theNote = await Note.findOne({_id: noteID})
        
        if (!theNote?.isDone) {
            await Note.findOneAndUpdate({_id: noteID},{
                isDone: true
            }, {new: true})

            return res.status(200).json({
                status: res.status,
                msg: 'Note done.'
            })
        }

        await Note.findOneAndUpdate({_id: noteID},{
            isDone: false
        }, {new: true})

        return res.status(200).json({
            status: res.status,
            msg: 'Note not done.'
        })
        
    } catch (err) {
        next(createError(400, err))
    }

}

export const deleteNote: RequestHandler = async (req, res, next) => {

    const {noteID, userID} = req.params as {noteID: string, userID: string}

    try {

        await Note.findOneAndDelete({_id: noteID})

        await User.findOneAndUpdate({_id: userID},{
            $pull: {
                myNotes: noteID
            }
        })

        return res.status(200).json({
            status: res.status,
            msg: 'Note deleted.'
        })
        
    } catch (err) {
        next(createError(400, err))
    }

}