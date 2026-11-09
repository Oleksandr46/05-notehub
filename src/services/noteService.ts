import axios from "axios";
import type { CreateNote, Note } from "../types/note";

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export const getNotes = async (
  page: number,
  perPage: number,
  search: string,
): Promise<FetchNotesResponse> => {
  const res = await API.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
    },
  });
  return res.data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const res = await API.post<Note>("/notes", newNote);
  return res.data;
};
