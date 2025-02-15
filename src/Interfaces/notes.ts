// src/Interfaces/notes.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  date: Date;
  completed: boolean;
}
