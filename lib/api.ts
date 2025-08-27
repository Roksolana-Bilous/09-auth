import axios from "axios";
import type { Note, NoteTag } from "@/types/note";
// axios.defaults.baseURL = "https://localhost:3000/api";
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const myApiKey = `Bearer ${myKey}`;
axios.defaults.headers.common['Authorization'] = myApiKey;

const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

if (!myKey) {
  throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is not defined. Please check your .env configuration.');
};

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
    page: number;
    data: Note[];
    total_pages: number;
    perPage: number;
}

interface RawFetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search,
  tag
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get<RawFetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search && { search }),
      ...(tag && tag !== "All" && { tag }),
    },
  });

  const raw = response.data;

  return {
    page,
    perPage,
    data: raw.notes,
    total_pages: raw.totalPages,
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
};
export const CreateNote = async (note: CreateNoteDto): Promise<Note> => {
  const response = await axios.post<Note>('/notes', note);
  return response.data;
};
export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${id}`);
    return response.data;
};

export const getNotes = async (categoryId?: string) => {
  const res = await nextServer.get<Note>('/notes', {
    params: { categoryId },
  });
  return res.data;
};
