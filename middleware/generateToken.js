import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "hiiiserver", {
    expiresIn: "1d",
  });
};

export default generateToken;
