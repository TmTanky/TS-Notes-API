import {model, Schema} from 'mongoose'

// Interfaces
import { Inote } from '../../interfaces/note'

const noteSchema = new Schema({
    title: String,
    content: String,
    noteBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isDone: {
        type: Boolean,
        default: false
    },
    isSecret: {
        type: Boolean,
        default: false
    }
})

export const Note = model<Inote>('Note', noteSchema)