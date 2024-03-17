import userModel from "../models/user.model.js";

export const registerController = async (req, res, next) => {
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
    // sex,
    // dob,
    // address,
    // image_url,
    // nationality,
    // role,
    // occupation,
  });

  const token = await user.createJWT();
  res.status(201).send({
    success: true,
    message: "User created successfully.",
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      //   sex: user.sex,
      //   dob: user.dob,
      //   address: user.address,
      //   image_url: user.image_url,
      //   nationality: user.nationality,
      //   role: user.role,
      //   occupation: user.occupation,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    next("Please provide all fields");
  }
  //find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid username or password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
   return next("Invalid username or password");
  }
  user.password = undefined;
  
  const token = await user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
