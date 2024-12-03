import { Request } from "express";
import { IFile } from "../../types/file";
import { fileUploader } from "../../../helpers/fileUploader";
import * as bcrypt from "bcrypt";
import prisma from "../../shared/prisma";

const createUserIntoDB = async (req: Request) => {
  const file = req.file as IFile;
  const payload = req.body;
  const userAvatar = file?.path;

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  const userData = {
    ...payload,
    avatar: userAvatar,
    password: hashedPassword,
  };
  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};
//     ...(userAvatar ? { avatar: userAvatar } : {}),

const updateUserIntoDB = async (id: string, req: Request) => {
  const file = req.file as IFile;
  const postInfo = req.body;
  const userAvatar = file?.path;

  const payload = {
    ...postInfo,
    ...(userAvatar ? { avatar: userAvatar } : {}),
  };

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const getAllUserFromDB = async () => {
  const result = await prisma.user.findMany();
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const userServices = {
  createUserIntoDB,
  updateUserIntoDB,
  getAllUserFromDB,
  deleteUserFromDB,
};
