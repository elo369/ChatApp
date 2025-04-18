import User from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import { errorHandler } from "../utilities/errorHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, userName, password, gender } = req.body;

  if (!fullName || !userName || !password || !gender) {
    return next(new errorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ userName });
  if (user) {
    return next(new errorHandler("User already exists", 400));
  }

  const harshToken = await bcrypt.hash(password, 10);

  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${userName}`;

  const registerUser = await new User({
    fullName,
    userName,
    password: harshToken,
    gender,
    avatar,
  });

  await registerUser.save();

  const tokendata = {
    _id: registerUser?._id,
  };

  const token = jwt.sign(tokendata, process.env.JWT_SECKET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        registerUser,
        token,
      },
    });
});

export const login = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  
  if (!userName || !password) {
    return next(new errorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ userName });
  if (!user) {
    return next(new errorHandler("not find username or passward", 400));
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return next(new errorHandler("not find username or passward", 400));
  }

  const tokendata = {
    _id: user?._id,
  };

  const token = jwt.sign(tokendata, process.env.JWT_SECKET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      samesite: "None",
      secure: true,
    })
    .json({ 
        success:true,
        responseData:{
            user,
            token
        }
     });
});

export const getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
  
    const userProfile = await User.findById(userId)
  
    res.status(200)
       .json({ 
          success:true,
          responseData:userProfile
       });
  });

export const logout = asyncHandler(async (req, res, next) => {
    res.status(200)
       .cookie("token","",{
        expiry: new Date(Date.now()),
        httpOnly:true
       })
       .json({ 
          success:true,
          responseData:"Logout successfully!"
       });
  });

  export const getOtherUsers = asyncHandler(async (req, res, next) => {
    const otherUsers = await User.find({ _id: { $ne: req.user._id } });
  
    res.status(200).json({
      success: true,
      responseData: otherUsers,
    });
  });