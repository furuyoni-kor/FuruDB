export type SuccessResponse<T> = {
  [key: string]: T;
} & {
  result: "success";
  length?: number;
};

export interface FailureResponse {
  result: "fail";
  error: string;
}

export type Response<T> = SuccessResponse<T> | FailureResponse;
