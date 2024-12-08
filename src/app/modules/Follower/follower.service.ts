import { Request } from "express";
import prisma from "../../shared/prisma";

const createFollowerIntoDB = async (req: Request) => {
  const payload = req.body;
  const result = await prisma.follower.create({
    data: payload,
  });
  return result;
};

const toggleFollowUnFollowShopIntoDB = async (req: Request) => {
  const { shopId, userId } = req.body;

  console.log(req.body);

  const existingFollower = await prisma.follower.findUnique({
    where: {
      userId_shopId: {
        userId,
        shopId,
      },
    },
  });

  if (existingFollower) {
    // If the follower exists, delete it (unfollow)
    const result = await prisma.follower.delete({
      where: {
        id: existingFollower.id,
      },
    });
    return result;
  } else {
    // If not following, create a new follower entry
    const result = await prisma.follower.create({
      data: {
        userId,
        shopId,
      },
    });

    return result;
  }
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
  toggleFollowUnFollowShopIntoDB,
};
