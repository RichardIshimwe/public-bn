import express from 'express';
import signup from '../controllers/signup.controller.js';

const routes = express.Router();

routes.post('/test', (req, res) => {
    // Your handler logic here
    res.json({ data: "from post request" });
});

routes.post('/', signup.signupUser)
// // routes.post('/', signupMiddleware, signup.signupUser)
routes.get('/', signup.allUsers)
// // routes.get('/',isAdmin, signup.allUsers)

export default routes