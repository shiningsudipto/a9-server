export type TProductFilters = {
  searchTerm?: string;
  category?: string;
  price?: number;
  stock?: number;
  priceMin?: number;
  priceMax?: number;
};
export type TPaginationOptions = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
