import { cookies } from "next/headers";
import { nextServer } from "./api";
import { FetchNotesParams, FetchNotesResponse, RawFetchNotesResponse, Note, } from "@/types/note";
import { User } from "@/types/user";

interface SessionResponse {
  newAccessToken?: string;
  newRefreshToken?: string;
  success: boolean;
}

const getAuthHeaders = () => {
  const cookieStore = cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const checkServerSession = async (): Promise<SessionResponse> => {
  const res = await nextServer.get<SessionResponse>("/auth/session", {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const refreshServerSession = async (): Promise<SessionResponse> => {
  const res = await nextServer.post<SessionResponse>(
    "/auth/refresh",
    {},
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const getServerMe = async (): Promise<User | null> => {
  try {
    const res = await nextServer.get<User>("/users/me", {
      headers: getAuthHeaders(),
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
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await nextServer.get<RawFetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search && { search }),
      ...(tag && tag !== "All" && { tag }),
    },
    headers: getAuthHeaders(),
  });

  return {
    page,
    perPage,
    data: res.data.notes,
    total_pages: res.data.totalPages,
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
