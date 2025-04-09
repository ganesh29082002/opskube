
import {User} from "../models/UserModel";
import { message } from '../config/message'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import response from "../helper/response";


export const register = async (req, res) => {
  try {
    console.log(req.body, "body");

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return response.badRequest(res, 400, message.USER_EMPTY_BODY);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.conflictErrorMsgResponse(res, 409, message.USER_ALREADY_EXIST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    return response.successResponse(res, 201, {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    }, message.USER_CREATION_SUCCESS);

  } catch (error) {
    console.error("Registration Error:", error);
    return response.somethingErrorMsgResponse(res, 500, message.USER_CREATION_FAILUER, error.message);
  }
};


export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return response.badRequest(res, 400, message.USER_EMPTY_BODY);
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return response.errorMessageResponse(res, 404, message.USER_NOT_FOUND);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return response.unAuthorizedErrorMsgResponse(res, 401, "Invalid Credentials, login failed");
    }

    const token = jwt.sign(
      { email, role: user.role, userId: user._id },
      process.env.SECRET_TOKEN_KEY,
      { expiresIn: "5h" }
    );

    return response.successResponse(res, 200, {
      token,
      user: {
        name: user.firstName,
        role: user.role,
        email: user.email,
        userId: user._id
      }
    }, "User Login successfully");

  } catch (error) {
    console.error("Login Error:", error);
    return response.somethingErrorMsgResponse(res, 500, "Internal Server Error", error.message);
  }
};
