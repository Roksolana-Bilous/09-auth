export interface User {
  email: string;
  username: string;
  avatar: string;
}

export type LoginRequestData = {
  email: string;
  password: string;
};

export type RegisterRequestData = {
  email: string;
  password: string;
  username?: string;
};

export type UpdateUserRequest = {
  username?: string;
};