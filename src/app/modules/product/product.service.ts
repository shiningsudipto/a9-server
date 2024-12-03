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
  console.log({ payload });
  const result = await prisma.product.create({
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

  // Log the constructed where conditions for debugging
  // console.log("Where Conditions:", whereConditions);

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

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
