import { nextServer } from "./api"; 
import { FetchNotesParams, FetchNotesResponse, RawFetchNotesResponse, Note } from "@/types/note";
import { User } from "@/types/user";

export const checkServerSession = async () => {
  const response = await nextServer.get("/auth/session");
  return response.data;
};

export const getServerMe = async (): Promise<User> => {
  const { data } = await nextServer.get("/users/me");
  return data;
};

export const fetchNotes = async ({ page = 1, perPage = 12, search, tag }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<RawFetchNotesResponse>("/notes", {
    params: { page, perPage, ...(search && { search }), ...(tag && tag !== 'All' && { tag }) },
  });
  const raw = response.data;
  return { page, perPage, data: raw.notes, total_pages: raw.totalPages };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};
