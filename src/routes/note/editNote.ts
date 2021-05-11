import { Router } from 'express'
const router = Router()

// Auth
import {authJWT} from '../../auth/auth'

// Controllers
import {editNote} from '../../controllers/noteController/note'

router.patch('/editnote/:noteID',authJWT, editNote)

export default router