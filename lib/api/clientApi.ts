import { nextServer } from "./api";
import type { User } from "@/types/user";
import { FetchNotesParams, FetchNotesResponse, RawFetchNotesResponse, Note, CreateNoteDto } from "@/types/note";

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

export const fetchNotes = async ({ page = 1, perPage = 12, search = '', tag }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<RawFetchNotesResponse>('/notes', {
    params: { page, perPage, ...(search && { search }), ...(tag && tag !== 'All' && { tag }) },
  });
  const raw = response.data;
  return { page, perPage, data: raw.notes, total_pages: raw.totalPages };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const login = async (payload: LoginRequestData): Promise<User> => {
  const response = await nextServer.post<User>("/auth/login", payload);
  return response.data;
};

export const register = async (payload: RegisterRequestData): Promise<User> => {
  const response = await nextServer.post<User>("/auth/register", payload);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const getProfile = async (): Promise<User> => {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
};

export const updateProfile = async (payload: UpdateUserRequest): Promise<User> => {
  const response = await nextServer.patch<User>("/users/me", payload);
  return response.data;
};

export const checkSession = async (): Promise<boolean> => {
  const response = await nextServer.get<{success: boolean}>("/auth/session");
  return response.data.success;
};
