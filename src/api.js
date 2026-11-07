export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const AUTH_CHANGE_EVENT = "careertree:auth-change";

const TOKEN_KEY = "careertree_access_token";

export function getAuthToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
  }
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export async function authFetch(path, options = {}) {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(path.startsWith("http") ? path : `${API_URL}${path}`, {
    ...options,
    headers,
  });
  if (response.status === 401 && token) setAuthToken(null);
  return response;
}

export async function apiRequest(path, options = {}) {
  const response = await authFetch(path, options);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("The server returned an unexpected response. Check that the backend is running.");
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}
