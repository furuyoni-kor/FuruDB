export type SuccessResponse<T> = {
  [key: string]: T;
} & {
  result: "success";
  length?: number;
};

export type SuccessResponseWithPagination<T> = {
  [key: string]: T;
} & {
  result: "success";
  currentPage: number;
  totalPage: number;
  length?: number;
};

export interface FailureResponse {
  result: "fail";
  error: string;
}

export type Response<T> =
  | SuccessResponse<T>
  | SuccessResponseWithPagination<T>
  | FailureResponse;
