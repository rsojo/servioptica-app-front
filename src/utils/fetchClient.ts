const DEFAULT_TIMEOUT_MS = Number(process.env.REACT_APP_FETCH_TIMEOUT_MS) || 300000;

export async function httpFetch(
  input: RequestInfo,
  init?: RequestInit,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  if (typeof window === "undefined") {
    // Server-side fallback
    return fetch(input, init);
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const mergedInit: RequestInit = { ...(init || {}), signal: controller.signal };
    const nativeFetch = (window as any)._originalFetch || window.fetch.bind(window);
    const res = await nativeFetch(input, mergedInit);
    clearTimeout(timer);
    return res;
  } catch (err: any) {
    clearTimeout(timer);
    if (err?.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  }
}

export function replaceGlobalFetch() {
  if (typeof window === "undefined") return;
  if (!(window as any)._originalFetch) {
    (window as any)._originalFetch = window.fetch.bind(window);
    (window as any).fetch = (input: RequestInfo, init?: RequestInit) => httpFetch(input, init);
  }
}

export function restoreOriginalFetch() {
  if (typeof window === "undefined") return;
  if ((window as any)._originalFetch) {
    window.fetch = (window as any)._originalFetch;
    delete (window as any)._originalFetch;
  }
}
