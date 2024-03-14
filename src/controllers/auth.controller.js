import userModel from "../models/user.model.js";

const registerController = async (req, res) => {
  try {
    // validate
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (!firstName) {
      return res
        .status(404)
        .send({ success: false, message: "Please provide a first name" });
    }
    if (!lastName) {
      return res
        .status(404)
        .send({ success: false, message: "Please provide a last name" });
    }
    if (!email) {
      return res
        .status(404)
        .send({ success: false, message: "Please provide an email address" });
    }
    if (!password) {
      return res
        .status(404)
        .send({ success: false, message: "Please provide a password" });
    }

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email already exists, Please login.",
      });
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
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in register controller.",
      success: false,
      error,
    });
  }
};

export default registerController;
