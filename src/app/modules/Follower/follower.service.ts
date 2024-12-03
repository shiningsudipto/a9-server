import { Request } from "express";
import prisma from "../../shared/prisma";

const createFollowerIntoDB = async (req: Request) => {
  const payload = req.body;
  const result = await prisma.follower.create({
    data: payload,
  });
  return result;
};

const getFollowerByShopFromDB = async (id: string) => {
  const result = await prisma.follower.findMany({
    where: {
      shopId: id,
    },
  });
  return result;
};

const getFollowingShopFromDB = async (id: string) => {
  const result = await prisma.follower.findMany({
    where: {
      userId: id,
    },
  });
  return result;
};

export const followerService = {
  createFollowerIntoDB,
  getFollowerByShopFromDB,
  getFollowingShopFromDB,
};
