import express from 'express';
import signup from '../controllers/signup.controller.js';
import signupMiddleware from '../middlewares/checkSignup.middleware.js'
import isAdmin from '../middlewares/isAdmin.middleware.js'

const routes = express.Router();

routes.post('/', signup.signupUser)
// routes.post('/', signupMiddleware, signup.signupUser)
routes.get('/', signup.allUsers)
// routes.get('/',isAdmin, signup.allUsers)

export default routes