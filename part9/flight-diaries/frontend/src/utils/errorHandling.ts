import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response && typeof error.response.data === 'string') {
      return error.response.data;
    }

    if (error.message && typeof error.message === 'string') {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
};
