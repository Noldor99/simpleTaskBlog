import { IUser } from "./user"

export enum ContentVariant {
  All = 'all',
  Research = 'research',
  Commentary = 'commentary',
  News = 'news',
}

export interface IContents {
  totalCount: number
  contents: IContent[]
}

export interface IContent {
  id: string
  router: string
  title: string
  description: string
  text: string
  variant: ContentVariant
  createdAt: string
  updatedAt: string
  user: IUser
}




