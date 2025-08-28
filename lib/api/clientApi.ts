import { api } from "../api/api";
import type { User, LoginRequestData, RegisterRequestData, UpdateUserRequest, CheckSessionRequest } from "@/types/user";
import { FetchNotesParams, FetchNotesResponse, RawFetchNotesResponse, Note, CreateNoteDto } from "@/types/note";

// Notes
export const fetchNotes = async ({ page = 1, perPage = 12, search = '', tag }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<RawFetchNotesResponse>('/notes', {
    params: { page, perPage, ...(search && { search }), ...(tag && tag !== 'All' && { tag }) },
  });
  const raw = response.data;
  return { page, perPage, data: raw.notes, total_pages: raw.totalPages };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const CreateNote = async (note: CreateNoteDto): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

// Auth
export const login = async (payload: LoginRequestData): Promise<User> => {
  const response = await api.post<User>("/auth/login", payload);
  return response.data;
};

export const register = async (payload: RegisterRequestData): Promise<User> => {
  const response = await api.post<User>("/auth/register", payload);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getProf = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const updateProf = async (payload: UpdateUserRequest): Promise<User> => {
  const response = await api.patch<User>("/users/me", payload);
  return response.data;
};

export const checkSession = async (): Promise<boolean> => {
  const response = await api.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
};
