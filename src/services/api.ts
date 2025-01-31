import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, SaveLinkRequest, UpdateLinkRequest, Link } from '../types';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data),
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),
};

export const links = {
  save: (data: SaveLinkRequest) => api.post<Link>('/links', data),
  getAll: () => api.get<{ links: Link[] }>('/links'),
  getById: (id: string) => api.get<Link>(`/links/${id}`),
  update: (id: string, data: UpdateLinkRequest) => api.put<Link>(`/links/${id}`, data),
  delete: (id: string) => api.delete(`/links/${id}`),
};