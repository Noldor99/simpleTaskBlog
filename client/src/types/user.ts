import { IPerson } from "./person"

export interface IUsers {
  totalCount: number
  users: IUser[]
}

export interface IUser {
  id: string
  username: string
  email: string
  roles: RolesEnum[]
  userImg: string
  person: IPerson
  createdAt: Date
  updatedAt: Date
}

export enum RolesEnum {
  ADMIN = 'ADMIN',
  MODER = 'MODER',
}


