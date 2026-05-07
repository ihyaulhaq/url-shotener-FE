const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export interface AuthResponse {
  token: string;
  refresh_token: string;
}

export interface APIError {
  code: number;
  message: string;
}

export interface Envelope<T> {
  data?: T;
  error?: APIError;
  timestamp: string;
}

async function request<T>(
  path: string,
  options: RequestInit
): Promise<Envelope<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const json: Envelope<T> = await res.json();
  return json;
}

export async function loginUser(email: string, password: string) {
  return request<AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signupUser(
  username: string,
  email: string,
  password: string
) {
  return request<AuthResponse>("/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}
