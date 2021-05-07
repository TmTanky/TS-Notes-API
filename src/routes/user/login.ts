import {Router} from 'express'
const router = Router()

// Controllers
import { loginUser } from '../../controllers/userController/login'

router.post('/login', loginUser)

export default router