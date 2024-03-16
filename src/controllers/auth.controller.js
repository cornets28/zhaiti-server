import userModel from "../models/user.model.js";

const registerController = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (!firstName) {
      next("First name is required");
    }
    if (!lastName) {
      next("last name is required");
    }
    if (!email) {
      next("Email is required");
    }
    if (!password) {
      next("Password is required and should be greater than 8 characters");
    }

    if (existingUser) {
      next("Email already exists, Please login.");
    }
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    res
      .status(201)
      .send({ success: true, message: "User created successfully.", user });
  } 


export default registerController;
