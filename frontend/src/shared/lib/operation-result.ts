import type { ApiError, TResult } from "@/shared/types/api.types";

export class OperationResultError extends Error {
  readonly code: string;
  readonly statusCode: number;

  constructor(error: ApiError, statusCode: number) {
    super(error.message);
    this.name = "OperationResultError";
    this.code = error.code;
    this.statusCode = statusCode;
  }
}

export function unwrapOperationResult<T>(result: TResult<T>): T {
  if (result.isFailure) {
    throw new OperationResultError(result.error, result.statusCode);
  }

  return result.value;
}
