import userModel from "../models/user.model.js";

export const updateUserController = async (req, res, next) => {
  const {
    firstName,
    email,
    lastName,
    sex,
    dob,
    address,
    image_url,
    nationality,
    role,
    occupation,
  } = req.body;

  if (!sex) {
    next("Sex is required");
  }
  if (!dob) {
    next("Date of birth is required");
  }
  if (!address) {
    next("Image is required");
  }
  if (!image_url) {
    next("image_url is required");
  }
  if (!nationality) {
    next("Nationality is required");
  }
  if (!role) {
    next("Role is required");
  }
  if (!occupation) {
    next("Occupation is required");
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.sex = sex;
  user.dob = dob;
  user.address = address;
  user.image_url = image_url;
  user.nationality = nationality;
  user.role = role;
  user.occupation = occupation;

  await user.save();
  const token = await user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};
