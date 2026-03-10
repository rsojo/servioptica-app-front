export function getApiBaseUrl(): string {
  const envBaseUrl = (process.env.REACT_APP_BASE_URL || "").trim();
  if (envBaseUrl) return envBaseUrl.replace(/\/+$/, "");

  if (typeof window !== "undefined") {
    return window.location.origin.replace(/\/+$/, "");
  }

  return "";
}
