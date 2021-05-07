import {Router} from 'express'
const router = Router()

// Controllers
import { registerUser } from '../../controllers/userController/register'

router.post('/register', registerUser)

export default router