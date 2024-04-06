import signup from '../models/signup.models.js'
import bcrypt from 'bcrypt'
import response from '../utils/response.util.js';

class signupControllers {
  static async signupUser(req, res) {
    try {
      const { email, username, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const passwordHashed = bcrypt.hashSync(password, salt);
        const newUser = new signup({ email, username, password: passwordHashed });
        await newUser.save()
        response.success(res, 201, "signup complete", newUser);
    } catch (error) {
      return response.error(res, 400, "internal server error");
    }
  }
  static async allUsers(req, res) {
    try {
      let allUser = await signup.find();
      response.success(res, 200, `all users are ${allUser.length}`, allUser);
    } catch (error) {
      console.log(error)
      return response.error(res, 500, "internal server error");
    }
  }
}

export default signupControllers