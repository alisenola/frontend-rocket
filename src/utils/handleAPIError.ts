import type { AxiosError } from "axios";
import axios from "axios";

const getServerErrorMessage = (error: AxiosError, genericMessage: string) => {
  if (typeof error.response?.data === "string") {
    return error.response.data;
  }
  return genericMessage;
};

export const handleAPIError = (error: unknown): { code?: number; message: string } => {
  let code: number | undefined;
  let message = "Unknown Error";

  if (axios.isAxiosError(error)) {
    code = error.response?.status;
    switch (code) {
      case 400:
        message = getServerErrorMessage(error, "Bad Request");
        break;
      case 401:
        message = getServerErrorMessage(error, "Unauthorized");
        break;
      case 403:
        message = getServerErrorMessage(error, "Forbidden");
        break;
      case 404:
        message = getServerErrorMessage(error, "Not Found");
        break;
      default:
        message = getServerErrorMessage(error, "Unknown Error");
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return { code, message };
};
