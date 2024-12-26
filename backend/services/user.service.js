import User from "../models/user.js";

const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !lastname || !email || !password)
    throw new Error("all fileds are required");

  const user = await User.create({
    fullname: { firstname, lastname },
    email,
    password,
  });

  return user;
};

export { createUser };
