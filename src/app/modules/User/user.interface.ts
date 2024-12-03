export interface TUser {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  avatar: string;
  role: TUserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum TUserRole {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  USER = "USER",
}
