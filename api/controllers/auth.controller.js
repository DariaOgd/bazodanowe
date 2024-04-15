import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newUser = new User({
        ...req.body,
        password: hash,
      });
  
      await newUser.save();
      res.status(201).send("User has been created.");
    } catch (err) {
      next(err);
    }
  };
  export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) return next(createError(404, "User not found"));
  
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isCorrect) return next(createError(400, "Wrong password or username"));
  
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_KEY
      );
  
      const { password, ...info } = user._doc;
      res.cookie("accessToken", token, {
        httpOnly: true,
      });
  
      res.status(200).send(info);
      console.log(`User with email "${req.body.email}" logged in successfully.`); // Log successful login with email (avoid sensitive data)
    } catch (err) {
      next(err);
    }
  };
export const logout = async (req,res) =>{
  res.clearCookie("accessToken", {
    sameSite:"none",
    secure: true,
  }).status(200).send("User has been loged out");
}