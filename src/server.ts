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

connect(`mongodb+srv://TmAdmin:${process.env.MONGO_PASSWORD}@cluster0.c7khy.mongodb.net/TS-Lorem-Notes-DB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(RegisterRoute)
app.use(LoginRoute)


app.use<RequestHandler>((req, res, next) => {
    next(createError(404, 'Route not found.'))
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500 || res.status).json({
        status: res.status,
        msg: err.message,
        err
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})