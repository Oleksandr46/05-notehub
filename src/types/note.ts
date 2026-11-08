export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNote {
  text: string;
}
export interface UpdateNote {
  completed: boolean;
}
