import {Router} from 'express'
const router = Router()

// Controllers
import {deleteNote} from '../../controllers/noteController/note'

router.delete('/deletenote/:userID/:noteID', deleteNote)

export default router