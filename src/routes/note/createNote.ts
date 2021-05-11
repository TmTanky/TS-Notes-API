import {Router} from 'express'
const router = Router()

// Auth
import {authJWT} from '../../auth/auth'

// Controllers
import {createNote} from '../../controllers/noteController/note'

router.post('/createnote/:userID', authJWT, createNote)

export default router