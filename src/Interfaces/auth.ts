export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  token: string;
  role: string;
}
