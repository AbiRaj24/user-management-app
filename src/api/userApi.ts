import axios from 'axios';
import type { User, UserDTO } from '../types/user';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
console.log("ENV URL:", import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

// Request interceptor — add auth token if needed in future
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — normalise errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// ─── CRUD Operations ────────────────────────────────────────────

export const userApi = {
  /** Fetch all users */
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  /** Fetch a single user by ID */
  getById: async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  /** Create a new user */
  create: async (payload: UserDTO): Promise<User> => {
    const { data } = await api.post<User>('/users', payload);
    return data;
  },

  /** Update an existing user */
  update: async (id: string, payload: Partial<UserDTO>): Promise<User> => {
    const { data } = await api.put<User>(`/users/${id}`, payload);
    return data;
  },

  /** Delete a user */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};