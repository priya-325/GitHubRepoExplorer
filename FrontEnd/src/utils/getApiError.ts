import axios from "axios";

export function getApiError(error: unknown, fallbackMessage: string): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string") {
      return message;
    }

    if (!error.response) {
      return "Unable to connect to the server. Please try again.";
    }

    if (error.response.status >= 500) {
      return "Server error. Please try again later.";
    }
  }

  return fallbackMessage;
}
