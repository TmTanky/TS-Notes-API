import {Router} from 'express'
const router = Router()

// Controllers
import {getUserNotes, getUserSecretNotes} from '../../controllers/userController/userInfo'

router.post('/getusernotes/:userID', getUserNotes)
router.post('/getusersecretnotes/:userID', getUserSecretNotes)

export default router