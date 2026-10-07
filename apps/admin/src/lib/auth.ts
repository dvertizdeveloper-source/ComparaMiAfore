const TOKEN_KEY = "cma_admin_token";

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

/** Login simple: valida contra el backend con la API key de admin */
export async function login(apiKey: string): Promise<boolean> {
  try {
    const res = await fetch("/api/v1/admin/dashboard/summary?from=2026-01-01&to=2026-12-31", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (res.ok) {
      setToken(apiKey);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function logout() {
  clearToken();
}
