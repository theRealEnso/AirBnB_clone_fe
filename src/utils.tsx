import { FetchBaseQueryError, SerializedError} from "@reduxjs/toolkit/query";

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
    if ("data" in error && error.data && typeof error.data === "object") {
      const errorData = error.data as { error?: { message?: string } };
      return errorData.error?.message || "An unexpected error occurred.";
    }
    return "An unexpected error occurred.";
  };
  