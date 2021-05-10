import {Document} from 'mongoose'

// Interfaces
import { Inote } from './note';

export interface Iuser extends Document {
    firstName: string
    lastName: string
    email: string
    password: string
    myNotes: Inote[]
    pincode: string
}