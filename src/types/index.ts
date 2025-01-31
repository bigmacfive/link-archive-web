export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Link {
  id: string;
  url: string;
  title: string;
  preview: string;
  summary: string;
  tags: string[];
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SaveLinkRequest {
  url: string;
  tags?: string[];
}

export interface UpdateLinkRequest {
  tags: string[];
}