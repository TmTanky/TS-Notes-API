import {model, Schema} from 'mongoose'

// Interfaces
import { Iuser } from '../../interfaces/user'

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    myNotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

export const User = model<Iuser>('User', userSchema)