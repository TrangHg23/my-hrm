import axios from "axios";

export const parseErrorMessage = (
  error: unknown,
  messageMap?: Record<string, string>,
  fallback = "Có lỗi xảy ra, vui lòng thử lại."
): string => {
  if (!axios.isAxiosError(error)) return fallback;

  const message = error.response?.data?.message;
  let result = fallback;

  if (Array.isArray(message)) result = message[0] || fallback;
  else if (typeof message === "string") result = message;

  if (messageMap) {
    const matched = Object.keys(messageMap).find((key) =>
      result.includes(key)
    );
    if (matched) return messageMap[matched];
  }

  return result;
};