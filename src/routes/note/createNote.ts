import {Router} from 'express'
const router = Router()

// Controllers
import {createNote} from '../../controllers/noteController/note'

router.post('/createnote/:userID', createNote)

export default router