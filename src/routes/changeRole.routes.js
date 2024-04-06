import express from 'express'
import changeRole from '../controllers/changeRole.controler.js'

const router = express.Router();

router.post('/', changeRole.makeAdmin)

export default router