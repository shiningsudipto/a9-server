import { Request } from "express";
import prisma from "../../shared/prisma";

const createCategoryIntoDB = async (req: Request) => {
  const payload = req.body;
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const updateCategoryIntoDB = async (req: Request) => {
  const payload = req.body;
  const result = await prisma.category.update({
    where: {
      id: payload.id,
    },
    data: payload,
  });
  return result;
};

const deleteCategoryFromDB = async (req: Request) => {
  const result = await prisma.category.delete({
    where: {
      id: req.body.id,
    },
  });
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await prisma.category.findMany();
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
  getAllCategoryFromDB,
};
