export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

export type LoginRequestData = {
  email: string;
  password: string;
};

export type RegisterRequestData = {
  email: string;
  password: string;
  username?: string; // якщо бекенд дозволяє
};

export type UpdateUserRequest = {
  username?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
};

export type CheckSessionRequest = {
  success: boolean;
};
