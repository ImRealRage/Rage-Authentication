import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing
import crypto from "crypto";
import User from "../models/user.model.js"; // Import the User model for database interactions
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; // Import function to generate token and set cookies
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js"; // Import function to send verification email

// Signup controller function to handle new user registration
export const signup = async (req, res) => {
  const { name, email, password } = req.body; // Destructure name, email, and password from request body
  try {
    // Check if all required fields are present
    if (!email || !password || !name) {
      throw new Error("All fields are required"); // Throw error if any field is missing
    }

    // Check if a user with the same email already exists in the database
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" }); // Return error response if user exists
    }

    // Hash the user's password using bcryptjs
    const hashedPassword = await bcryptjs.hash(password, 10); // 10 is the salt rounds for hashing

    // Generate a random 6-digit verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create a new user instance with the provided data
    const user = new User({
      email,
      password: hashedPassword, // Store the hashed password
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token expires in 24 hours
    });

    // Save the new user to the database
    await user.save();

    // Generate JWT token and set it as a cookie in the response
    generateTokenAndSetCookie(res, user._id);

    // Send the verification email with the generated token
    await sendVerificationEmail(user.email, verificationToken);

    // Respond with success message and user details (excluding password)
    res.status(201).json({
      success: true,
      message: "User created successfully", // Send success message
      user: {
        ...user._doc,
        password: undefined, // Ensure the password is not sent back in the response
      },
    });
  } catch (error) {
    // Handle errors and send a failure response
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Logout controller
export const logout = async (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    //Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hours
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();
    //send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }
    //update new passord
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
    await sendResetSuccessEmail(user.email);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log("Error in resetPassword", error);
  }
};

export const checkAuth = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  res.status(200).json({
    success: true,
    message: "User found",
    user: {
      ...user._doc,
      password: undefined,
    },
  });
  try {
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
