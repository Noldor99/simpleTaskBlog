import { z } from 'zod'
import { api } from '@/lib/axios'
import { IUser } from '@/types/user'
import { AxiosResponse } from 'axios'

export const AuthSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, {
      message: 'Username must be at least 2 characters long',
    })
    .max(30, {
      message: 'Username must be less than 30 characters long',
    }),
  password: z.string().trim().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
})


export const RegisterSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, {
      message: 'Username must be at least 2 characters long',
    })
    .max(30, {
      message: 'Username must be less than 30 characters long',
    }),
  email: z
    .string()
    .email({
      message: 'Invalid email format',
    }),
  password: z
    .string()
    .trim()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    }),
  confirmPassword: z
    .string()
    .trim()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type IAuthSchema = z.infer<typeof AuthSchema>
export type IRegisterSchema = z.infer<typeof RegisterSchema>;

export interface ApiAuth {
  login: (body: IAuthSchema) => Promise<IUser>;
  logout: () => Promise<IUser>;
  refresh: () => Promise<IUser>;
  registration: (body: FormData | IRegisterSchema) => Promise<IUser>;
}

export const ApiAuth: ApiAuth = {
  login: (body) => api.post('/auth/login', body).then(qw),
  logout: () => api.post('/auth/logout').then(qw),
  refresh: () => api.get('/auth/refresh').then(qw),
  registration: (body) => api.post('/auth/registration', body).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;