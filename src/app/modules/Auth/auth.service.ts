import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../shared/prisma";
import * as bcrypt from "bcrypt";
import ApiError from "../../errors/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";

const loginUserService = async (payload: {
  email: string;
  password: string;
}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const rData = {
    token: accessToken,
    // userInfo: userData,
  };

  return rData;
};

const forgetPasswordIntoDB = async (email: string) => {
  const isUserAvailable = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserAvailable) {
    throw new ApiError(404, "User not found");
  }

  const token = jwt.sign(
    { email, id: isUserAvailable.id },
    config.jwt.jwt_secret as string,
    { expiresIn: "1h" }
  );

  const resetLink = `http://localhost:5173/reset-password/?id=${isUserAvailable.id}&token=${token}`;

  sendEmail(resetLink, email);

  return "Reset link sent to your email";
};

export const authServices = {
  loginUserService,
  forgetPasswordIntoDB,
};
