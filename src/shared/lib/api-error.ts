import axios from "axios";
import type { TResult } from "@/shared/types/api.types";

const statusMessages: Record<number, string> = {
  401: "Your session has expired. Please sign in again.",
  403: "You do not have permission to perform this action.",
  404: "The requested resource was not found.",
  409: "This data already exists.",
  422: "Please review the entered data.",
};

export function resolveApiError(error: unknown): string {
  if (!axios.isAxiosError<TResult<unknown>>(error)) {
    return error instanceof Error
      ? error.message
      : "An unexpected error occurred.";
  }

  if (!error.response) {
    return "The server is unreachable. Check that the API is running.";
  }

  if (error.response.status >= 500) {
    return "The server encountered an error. Please try again later.";
  }

  const apiMessage = error.response.data?.error?.message;
  if (apiMessage) {
    return apiMessage;
  }

  return (
    statusMessages[error.response.status] ?? "An unexpected error occurred."
  );
}
