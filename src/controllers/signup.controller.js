import signup from "../models/signup.models.js";
import bcrypt from "bcrypt";
import response from "../utils/response.util.js";

class signupControllers {
  static async signupUser(req, res) {
    try {
      // const { email } = req.query;
      const { email, username, password } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const passwordHashed = bcrypt.hashSync(password, salt);
      const check = await signup.findOne({ username });
      if (check !== null) {
        return response.error(res, 400, "username already exist");
      }
      const newUser = new signup({ email, username : "hfdhgdfhd", password: "passwordHashed" });
      await newUser.save();
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
      console.log(error);
      return response.error(res, 500, "internal server error");
    }
  }
  static async transact(req, res) {
    try {
      const { amount, op, username } = req.body;
      const check = await signup.findOne({ username });
      if (check == null) {
        return response.error(res, 404, "the user does not exist");
      }
      if (op === "add") {
        await signup.updateOne(
          { username: username },
          { $inc: { wallet: amount } }
        );
        response.success(res, 200, "wallet updated");
      } else if (op === "sub") {
        const user = await signup.findOne({ username: username });
        if (user.wallet < amount) {
          return response.error(res, 400, "insufficient funds");
        }
        await signup.updateOne(
          { username: username },
          { $inc: { wallet: -amount } }
        );
        response.success(res, 200, "wallet updated");
      }
    } catch (error) {
      console.log(error);
      return response.error(res, 500, "internal server error");
    }
  }
}

export default signupControllers;
