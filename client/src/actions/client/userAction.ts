import { AxiosResponse } from 'axios';
import { z } from 'zod';
import { api } from '@/lib/axios';
import { IUser, IUsers } from '@/types/user';

export const UserSchema = z.object({
  username: z.string().trim().optional(),
  email: z
    .string()
    .email({
      message: 'Invalid email format',
    }).optional(),
  password: z
    .string()
    .trim()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .refine((value) => /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(value), {
      message: 'Only english letters, numbers, and special characters are allowed',
    }),
  confirmPassword: z
    .string()
    .trim()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export type IUserSchema = z.infer<typeof UserSchema>;

export interface QueryUserParams {
  page?: number | string;
  limit?: number | string;
  search?: string
}

interface ApiUser {
  getUsers: (params: QueryUserParams) => Promise<IUsers>;
  getUserById: (id: string) => Promise<IUser>;
  updateUser: (data: IUserSchema) => Promise<IUser>;
  deleteUser: (id: string) => Promise<IUser>;
}

export const apiUser: ApiUser = {
  getUsers: (params) => api.get('/users', { params }).then(qw),
  getUserById: (id: string) => api.get(`/users/${id}`).then(qw),
  updateUser: (body) => api.patch('/users/edit', body).then(qw),
  deleteUser: (id) => api.delete(`/users/${id}`).then(qw),
};



const qw = <T>(response: AxiosResponse<T>) => response.data