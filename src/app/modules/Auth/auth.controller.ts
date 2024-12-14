import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { authServices } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully!",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await authServices.forgetPasswordIntoDB(req.body.email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const id = req.body.id;
  const newPassword = req.body.newPassword;
  const token = req.body.token;
  const result = await authServices.resetPasswordIntoDB(id, newPassword, token);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

const changedPassword = catchAsync(async (req, res) => {
  const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const result = await authServices.changePasswordIntDB(
    email,
    oldPassword,
    newPassword
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result,
  });
});

export const authController = {
  loginUser,
  forgetPassword,
  resetPassword,
  changedPassword,
};
