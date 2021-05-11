import {Router} from 'express'
const router = Router()

// Auth
import {authJWT} from '../../auth/auth'

// Controllers
import {getUserNotes, getUserSecretNotes} from '../../controllers/userController/userInfo'

router.post('/getusernotes/:userID',authJWT, getUserNotes)
router.post('/getusersecretnotes/:userID',authJWT, getUserSecretNotes)

export default router