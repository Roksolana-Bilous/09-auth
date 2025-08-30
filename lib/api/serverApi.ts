import { cookies } from "next/headers";
import { nextServer } from "./api"; 
import { FetchNotesParams, FetchNotesResponse, RawFetchNotesResponse, Note } from "@/types/note";
import { User } from "@/types/user";

interface SessionResponse {
  newAccessToken?: string;
  newRefreshToken?: string;
  success: boolean;
}


export const checkServerSession = async (): Promise<SessionResponse> => {
  const cookieStore = await cookies();
    const response = await nextServer.get<SessionResponse>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
    return response.data;
};

export const getServerMe = async (): Promise<User | null> => {
  try {
    const cookieStore = cookies();
    const res = await nextServer.get<User>("/users/me", {
      headers: {
        Cookie: (await cookieStore).toString(),
      },
    });
    return res.data;
  } catch (err) {
    console.error("getServerMe failed:", err);
    return null;
  }
};


export const fetchNotes = async ({
    page = 1,
    perPage = 12,
    search,
    tag }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = cookies();
  const response = await nextServer.get<RawFetchNotesResponse>("/notes", {
      params: { page, perPage, ...(search && { search }), ...(tag && tag !== 'All' && { tag }) },
        headers: {
            Cookie: (await cookieStore).toString(),
        },
  });
  const raw = response.data;
  return { page, perPage, data: raw.notes, total_pages: raw.totalPages };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();
    const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: (await cookieStore).toString(),
    },
  });
  return response.data;
};
