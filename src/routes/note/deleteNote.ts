import {Router} from 'express'
const router = Router()

// Controllers
import {deleteNote} from '../../controllers/noteController/note'

// Auth
import { authJWT } from '../../auth/auth'

router.delete('/deletenote/:userID/:noteID',authJWT, deleteNote)

export default router