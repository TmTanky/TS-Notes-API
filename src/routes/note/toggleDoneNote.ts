import {Router} from 'express'
const router = Router()

// Auth
import {authJWT} from '../../auth/auth'

// Controllers
import {toggleDoneNote} from '../../controllers/noteController/note'

router.patch('/toggledonenote/:noteID',authJWT, toggleDoneNote)

export default router