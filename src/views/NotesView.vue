<template>
  <div class="mx-auto flex flex-col items-center">
    <!-- Botón para abrir el modal -->
    <button  class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-90 transition duration-100" @click="showModal = true">
      Nueva Nota +
    </button>

    <!-- Lista de Notas -->
    <div class="w-full h-[475px] border border-gray-300 rounded p-4 shadow">
      <NoteList @edit="editNote" @delete="deleteNote" />
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/50">
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h2 class="text-lg font-bold mb-4">{{ noteToEdit ? 'Editar Nota' : 'Nueva Nota' }}</h2>
        <NoteForm :note="noteToEdit ?? undefined" :closeModal="closeModal" @submit="handleSaveNote" />
        <button @click="closeModal" class="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 active:scale-90 transition duration-100">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNotesStore } from "@/stores/notes";
import NoteForm from "@/components/NoteForm.vue";
import NoteList from "@/components/NoteList.vue";
import type { Note } from "@/Interfaces/notes";

const store = useNotesStore();
const showModal = ref(false);
const noteToEdit = ref<Note | null>(null);

const handleSaveNote = (note: Note) => {
  if (noteToEdit.value) {
    store.updateNote(note.id, note);
  } else {
    store.addNote(note);
  }
  closeModal();
};

const editNote = (note: Note) => {
  noteToEdit.value = note;
  showModal.value = true;
};

const deleteNote = (id: string) => {
  store.deleteNote(id);
};

const closeModal = () => {
  showModal.value = false;
  noteToEdit.value = null;
};
</script>
