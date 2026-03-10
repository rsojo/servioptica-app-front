const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1"];

function hasLocalhost(url: string): boolean {
  return LOCAL_HOSTNAMES.some((host) => url.includes(host));
}

export function getApiBaseUrl(): string {
  const envBaseUrl = (process.env.REACT_APP_BASE_URL || "").trim();

  if (typeof window === "undefined") {
    return envBaseUrl.replace(/\/+$/, "");
  }

  const origin = window.location.origin;
  const isCurrentHostLocal = LOCAL_HOSTNAMES.includes(window.location.hostname);

  // En producción, evita usar una URL local embebida por error en variables de entorno.
  const safeBaseUrl = !isCurrentHostLocal && hasLocalhost(envBaseUrl) ? origin : envBaseUrl || origin;

  return safeBaseUrl.replace(/\/+$/, "");
}
