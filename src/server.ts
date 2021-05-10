require('dotenv').config()
import express, { Request, Response, NextFunction, RequestHandler } from 'express'
import {connect} from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import createError from 'http-errors'

const app = express()
const PORT = process.env.PORT || 8000

// Routes
import RegisterRoute from './routes/user/register'
import LoginRoute from './routes/user/login'
import CreateNoteRoute from './routes/note/createNote'
import EditNoteRoute from './routes/note/editNote'
import ToggleDoneNoteRoute from './routes/note/toggleDoneNote'
import DeleteNoteRoute from './routes/note/deleteNote'
import UserInfoRoute from './routes/user/usersNotes'

connect(`mongodb+srv://TmAdmin:${process.env.MONGO_PASSWORD}@cluster0.c7khy.mongodb.net/TS-Lorem-Notes-DB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(RegisterRoute)
app.use(LoginRoute)
app.use(CreateNoteRoute)
app.use(EditNoteRoute)
app.use(ToggleDoneNoteRoute)
app.use(DeleteNoteRoute)
app.use(UserInfoRoute)

app.use<RequestHandler>((req, res, next) => {
    next(createError(404, 'Route not found.'))
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.json({
        msg: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})