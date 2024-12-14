import { Request } from "express";
import { IFile, TImageFiles } from "../../types/file";
import prisma from "../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { Prisma } from "@prisma/client";
import { productSearchableFields } from "../../constants/searchAndFilter";
import {
  TPaginationOptions,
  TProductFilters,
} from "../../types/searchAndFilter.type";

const createProductIntoDB = async (req: Request) => {
  const postInfo = req.body;
  const files = req.files as TImageFiles;
  const imagePaths = files?.images?.map((file: IFile) => file.path);
  const payload = {
    ...postInfo,
    images: imagePaths,
  };
  const result = await prisma.product.create({
    data: payload,
  });
  return result;
};

const duplicateProductIntoDB = async (req: Request) => {
  const payload = req.body;
  const result = await prisma.product.create({
    data: payload,
  });
  return result;
};

const updateProductIntoDB = async (req: Request) => {
  const postInfo = req.body;
  const files = req.files as TImageFiles;

  const existingImages = postInfo.images || [];

  const newImagePaths = files?.images?.length
    ? files.images.map((file: IFile) => file.path)
    : [];

  const combinedImages = [...existingImages, ...newImagePaths];

  const payload = {
    ...postInfo,
    ...(combinedImages.length > 0 && { images: combinedImages }),
  };
  const result = await prisma.product.update({
    where: {
      id: postInfo.id,
    },
    data: payload,
  });
  return result;
};

const getAllProductsFromDB = async (
  filters: TProductFilters,
  options: TPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.ProductWhereInput[] = [];

  // Handle search term (partial matching on searchable fields)
  if (searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive" as Prisma.QueryMode,
        },
      })),
    });
  }

  // Handle specific filters (case-insensitive match for 'category')
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => {
      if (key === "category") {
        return {
          [key]: {
            equals: (filterData as Record<string, any>)[key],
            mode: "insensitive" as Prisma.QueryMode,
          },
        };
      }
      return {
        [key]: {
          equals: (filterData as Record<string, any>)[key],
        },
      };
    });
    andConditions.push(...filterConditions);
  }

  // Combine all conditions into a single where clause
  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Handle sorting
  const orderBy = sortBy
    ? { [sortBy]: sortOrder === "desc" ? "desc" : "asc" }
    : undefined;

  // Query the database
  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy,
  });

  // Count total products matching the conditions
  const total = await prisma.product.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getProductsByShop = async (id: string) => {
  const result = await prisma.product.findMany({
    where: {
      shopId: id,
    },
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await prisma.product.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const getFlashSaleProductsFromDB = async () => {
  const result = await prisma.product.findMany({
    where: {
      flashSale: true,
    },
    include: {
      shop: true,
    },
  });
  return result;
};

const getProductByIdFromDB = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      shop: true,
      Reviews: true,
    },
  });
  return result;
};

const getProductByCategoryFromDB = async (category: string) => {
  const result = await prisma.product.findMany({
    where: {
      category: {
        equals: category,
        mode: "insensitive",
      },
    },
  });
  return result;
};

const getProductsFromFollowingShopsFromDB = async (userId: string) => {
  const result = await prisma.product.findMany({
    where: {
      shop: {
        Follower: {
          some: {
            userId: userId,
          },
        },
      },
    },
    include: {
      shop: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
  });

  return result;
};

export const productServices = {
  createProductIntoDB,
  updateProductIntoDB,
  getAllProductsFromDB,
  getProductsByShop,
  deleteProductFromDB,
  duplicateProductIntoDB,
  getFlashSaleProductsFromDB,
  getProductByIdFromDB,
  getProductByCategoryFromDB,
  getProductsFromFollowingShopsFromDB,
};
