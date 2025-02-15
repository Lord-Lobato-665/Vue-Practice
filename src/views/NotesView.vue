<!-- src/views/NotesView.vue -->
<template>
  <div class="mx-auto flex flex-col items-center">
    <div class="flex gap-4">
    <!-- Botón para abrir el modal de notas -->
    <button
      class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-90 transition duration-100"
      @click="showNoteModal = true"
    >
      Nueva Nota +
    </button>

    <!-- Botón para abrir el modal de personalización -->
    <button
      class="mb-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 active:scale-90 transition duration-100"
      @click="showCustomTagsModal = true"
    >
      Personalización
    </button>
    </div>

    <!-- Lista de Notas -->
    <div class="w-full h-[475px] border border-gray-300 rounded p-4 shadow">
      <NoteList @edit="editNote" @delete="deleteNote" />
    </div>

    <!-- Modal de Notas -->
    <div
      v-if="showNoteModal"
      class="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h2 class="text-lg font-bold mb-4">
          {{ noteToEdit ? "Editar Nota" : "Nueva Nota" }}
        </h2>
        <NoteForm
          :note="noteToEdit ?? undefined"
          :closeModal="closeNoteModal"
          @submit="handleSaveNote"
        />
        <button
          @click="closeNoteModal"
          class="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 active:scale-90 transition duration-100"
        >
          Cerrar
        </button>
      </div>
    </div>

    <!-- Modal de Personalización de Etiquetas -->
    <CustomTagsModal v-if="showCustomTagsModal" @close="closeCustomTagsModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNotesStore } from "@/stores/notes";
import NoteForm from "@/components/NoteForm.vue";
import NoteList from "@/components/NoteList.vue";
import CustomTagsModal from "@/components/CustomTagsModal.vue";
import type { Note } from "@/Interfaces/notes";

const store = useNotesStore();
const showNoteModal = ref(false);
const showCustomTagsModal = ref(false);
const noteToEdit = ref<Note | null>(null);

const handleSaveNote = (note: Note) => {
  if (noteToEdit.value) {
    store.updateNote(note.id, note);
  } else {
    store.addNote(note);
  }
  closeNoteModal();
};

const editNote = (note: Note) => {
  noteToEdit.value = note;
  showNoteModal.value = true;
};

const deleteNote = (id: string) => {
  store.deleteNote(id);
};

const closeNoteModal = () => {
  showNoteModal.value = false;
  noteToEdit.value = null;
};

const closeCustomTagsModal = () => {
  showCustomTagsModal.value = false;
};
</script>
