import express from 'express'
import { getuser, signout } from '../controllers/user.controller.js';


const router = express.Router()

router.post('/single',getuser)
router.post('/signout', signout);


export default router