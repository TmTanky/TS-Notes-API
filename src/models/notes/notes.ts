import {model, Schema} from 'mongoose'

// Interfaces
import { Inote } from '../../interfaces/note'

const noteSchema = new Schema({
    title: String,
    content: String,
    noteBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const Note = model<Inote>('Note', noteSchema)