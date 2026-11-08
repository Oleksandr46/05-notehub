import { useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";

import { getNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryFn: () => getNotes(page, 12, search),
    queryKey: ["notes", page, search],
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={inputValue}
          onChange={(value: string) => {
            setInputValue(value);
            handleSearch(value);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} type="button" onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <p className={css.loading}>Loading...</p>}
      {isError && <p className={css.error}>{error.message}</p>}
      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm />
        </Modal>
      )}
    </div>
  );
}
