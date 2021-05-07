import { Router } from 'express'
const router = Router()

// Controllers
import {editNote} from '../../controllers/noteController/note'

router.patch('/editnote/:noteID', editNote)

export default router