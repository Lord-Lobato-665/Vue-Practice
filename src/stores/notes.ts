// src/stores/notes.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Note } from "@/Interfaces/notes";
import type { CustomTag } from "@/Interfaces/tags";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<Note[]>(JSON.parse(localStorage.getItem("notes") || "[]"));
  const customTags = ref<CustomTag[]>(JSON.parse(localStorage.getItem("customTags") || "[]"));

  const addNote = (note: Omit<Note, "id" | "date">) => {
    const newNote = {
      ...note,
      id: self.crypto.randomUUID(),
      date: new Date(),
    };
    notes.value.push(newNote);
  };

  const updateNote = (id: string, updatedNote: Omit<Note, "id" | "date">) => {
    const index = notes.value.findIndex((note) => note.id === id);
    if (index !== -1) {
      notes.value[index] = {
        ...notes.value[index],
        ...updatedNote,
      };
    }
  };

  const deleteNote = (id: string) => {
    notes.value = notes.value.filter((note) => note.id !== id);
  };

  const deleteAllNotes = () => {
    notes.value = [];
  };

  const deleteNotesByTag = (tag: string) => {
    notes.value = notes.value.filter((note) => !note.tags.includes(tag));
  };

  // Métodos para gestionar etiquetas personalizadas
  const addCustomTag = (tag: CustomTag) => {
    customTags.value.push(tag);
  };

  const updateCustomTag = (oldName: string, updatedTag: CustomTag) => {
    // Actualizar la etiqueta en customTags
    const index = customTags.value.findIndex((tag) => tag.name === oldName);
    if (index !== -1) {
      customTags.value[index] = updatedTag;
    }

    // Actualizar las etiquetas en las notas
    notes.value = notes.value.map((note) => ({
      ...note,
      tags: note.tags.map((tag) => (tag === oldName ? updatedTag.name : tag)),
    }));
  };

  const deleteCustomTag = (tagName: string) => {
    customTags.value = customTags.value.filter((tag) => tag.name !== tagName);
  };

  // Guardar en localStorage cada vez que las notas o etiquetas cambien
  watch(
    [notes, customTags],
    () => {
      localStorage.setItem("notes", JSON.stringify(notes.value));
      localStorage.setItem("customTags", JSON.stringify(customTags.value));
    },
    { deep: true }
  );

  // src/stores/notes.ts
const toggleNoteCompletion = (id: string) => {
  const index = notes.value.findIndex((note) => note.id === id)
  if (index !== -1) {
    notes.value[index].completed = !notes.value[index].completed
  }
}

  return {
    notes,
    customTags,
    addNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
    deleteNotesByTag,
    addCustomTag,
    updateCustomTag,
    deleteCustomTag,
    toggleNoteCompletion
  };
});
