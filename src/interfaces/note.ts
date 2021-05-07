import {Document} from 'mongoose'

// Interfaces
import { Iuser } from './user';

export interface Inote extends Document {
    title: string
    content: string
    noteBy: Iuser
    isDone: boolean
    isSecret: boolean
}