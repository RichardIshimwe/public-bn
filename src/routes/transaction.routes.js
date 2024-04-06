import express from 'express';
import signup from '../controllers/signup.controller.js';
import signupMiddleware from '../middlewares/checkSignup.middleware.js'

const routes = express.Router();

routes.post('/', signup.transact)

export default routes