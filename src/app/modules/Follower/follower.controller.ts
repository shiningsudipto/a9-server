import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { followerService } from "./follower.service";

const createFollower = catchAsync(async (req: Request, res: Response) => {
  const result = followerService.createFollowerIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Follower created successfully",
    data: result,
  });
});

const toggleFollow = catchAsync(async (req: Request, res: Response) => {
  const result = followerService.toggleFollowUnFollowShopIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Follow/Un-follow action done!",
    data: result,
  });
});

const getFollowerByShop = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = followerService.getFollowerByShopFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Follower retrieved successfully",
    data: result,
  });
});

const getFollowingShopByUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = followerService.getFollowerByShopFromDB(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Following shop retrieved successfully",
      data: result,
    });
  }
);

export const followerControllers = {
  createFollower,
  toggleFollow,
  getFollowerByShop,
  getFollowingShopByUser,
};
