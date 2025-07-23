export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedBreedsResponse {
  data: string[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export interface FavoriteRequest {
  breed: string;
}

export interface FavoritesResponse extends Array<string> {}
