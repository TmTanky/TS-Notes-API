import {Router} from 'express'
const router = Router()

// Controllers
import {toggleDoneNote} from '../../controllers/noteController/note'

router.patch('/toggledonenote/:noteID', toggleDoneNote)

export default router