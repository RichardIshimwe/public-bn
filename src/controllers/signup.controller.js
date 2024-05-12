import signup from "../models/signup.models.js";
import bcrypt from "bcrypt";
import response from "../utils/response.util.js";

class signupControllers {
  static async signupUser(req, res) {
    try {
      // const { email, username, password } = req.body;
      const { username } = req.query;

      const salt = bcrypt.genSaltSync(10);
      const passwordHashed = bcrypt.hashSync("password", salt);
      const check = await signup.findOne({ username });
      if (check !== null) {
        return response.error(res, 400, "username already exist");
      }
      const newUser = new signup({ email : "pubtoiletmanage@gmail.com", username , password: passwordHashed });
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

  static async userById(req, res) {
    try {
      const { id } = req.query;
      console.log(id);
      let allUser = await signup.findOne({ username: id });
      response.success(res, 200, allUser);
    } catch (error) {
      console.log(error);
      return response.error(res, 500, "internal server error");
    }
  }

  static async transact(req, res) {
    try {
      const { amount, op, id } = req.query;
      console.log(amount - 20, op, id);

      // there is no need to check if the user exist because the user must exist before the wallet can be updated(all cards are in the db for now)
      // const check = await signup.findOne({ username : id});
      // if (check == null) {
      //   return response.error(res, 404, "the user does not exist");
      // }
      if (op === "add") {
        const updated =  await signup.updateOne(
          { username: id },
          { $inc: { wallet: amount } }
        );
        console.log(updated);
        response.success(res, 200, updated);
      } else if (op === "sub") {
        // this is checked on the hardware side
        // const user = await signup.findOne({ username: username });
        // if (user.wallet < amount) {
        //   return response.error(res, 400, "insufficient funds");
        // }
       const updated =  await signup.updateOne(
          { username: id },
          { $inc: { wallet: -amount } }
        );
        response.success(res, 200, updated);
      }

    } catch (error) {
      console.log(error);
      return response.error(res, 500, "internal server error");
    }
  }
}

export default signupControllers;
