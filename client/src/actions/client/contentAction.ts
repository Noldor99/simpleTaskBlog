import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { ContentVariant, IContent, IContents } from '@/types/content';


export const ContentSchema = z.object({
  router: z.string()
    .refine((value) => /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(value), {
      message: 'Only english letters, numbers, and special characters are allowed',
    }),
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters.' })
    .max(100, { message: 'Title must be at most 100 characters.' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters.' })
    .max(300, { message: 'Description must be at most 300 characters.' }),
  text: z.string(),
  variant: z.string()
});

export type IContentSchema = z.infer<typeof ContentSchema>

export interface QueryContentParams {
  page?: string | number;
  limit?: string | number;
  variant?: ContentVariant
  personRouter?: string
  search?: string
}

export interface ApiContent {
  create: (body: IContentSchema) => Promise<IContent>;
  getAll: (params: QueryContentParams) => Promise<IContents>;
  getOne: (id: string) => Promise<IContent>;
  update: (contentId: string, data: IContentSchema) => Promise<IContent>;
  remove: (id: string) => Promise<void>;
}

export const apiContent: ApiContent = {
  create: (body) => api.post('/content', body).then(qw),
  getAll: (params) => api.get('/content', { params }).then(qw),
  getOne: (id) => api.get(`/content/${id}`).then(qw),
  update: (contentId, body) => api.patch(`/content/${contentId}`, body).then(qw),
  remove: (id) => api.delete(`/content/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;