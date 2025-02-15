<!-- src/components/NoteItem.vue -->
<template>
  <div class="p-4 bg-gray-100 border-2 border-gray-400 rounded-lg shadow mb-4">
    <!-- Contenido de la nota -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">

        <h3 :class="{'line-through': note.completed}" class="text-lg font-bold mb-3">
          {{ note.title }}
        </h3>
      </div>
      <div class="flex space-x-2">
        <button
          @click="toggleCompletion"
          :class="{
            'bg-gray-500/40 border-2 border-gray-600/50 border-dotted': !note.completed,
            'bg-green-500/40 border-2 border-green-600/50 border-dotted': note.completed,
          }"
          class="px-6 py-2 text-white rounded transition duration-100 active:scale-90 flex items-center space-x-2"
        >
          <!-- Ícono de check (✔) -->
          <span v-if="note.completed" class="text-white">✔</span>
          <span>{{ note.completed ? 'Completado' : 'Completar' }}</span>
        </button>
        <button
          @click="$emit('edit', note)"
          class="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 active:scale-90 transition duration-100"
        >
          Editar
        </button>
        <button
          @click="confirmDelete(note)"
          class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 active:scale-90 transition duration-100"
        >
          Eliminar
        </button>
      </div>
    </div>
    <p :class="{'line-through': note.completed}" class="text-sm mb-3">{{ note.content }}</p>
    <p class="text-xs text-gray-500 mb-3">
      Creado el {{ formattedDate }} a las {{ formattedTime }}
    </p>

    <!-- Mostrar todas las etiquetas -->
    <div class="flex flex-wrap gap-2 mb-3">
      <span v-for="tag in note.tags" :key="tag" :class="getTagClass(tag)">
        {{ tag }}
      </span>
    </div>
  </div>

  <!-- Modal de Confirmación -->
  <Modal v-if="isModalOpen">
    <template #header>
      <h2 class="text-lg font-bold">Confirmar Eliminación</h2>
    </template>

    <template #body>
      <p>
        ¿Estás seguro de que deseas eliminar la nota
        <strong>{{ selectedNote?.title }}</strong
        >?
      </p>
    </template>

    <template #footer>
      <div class="flex justify-end space-x-2">
        <button
          @click="isModalOpen = false"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 active:scale-90 transition duration-100"
        >
          Cancelar
        </button>
        <button
          @click="deleteNote"
          class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 active:bg-red-700 active:scale-90 transition duration-100"
        >
          Confirmar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from "vue";
import { useNotesStore } from "@/stores/notes";
import type { Note } from "@/Interfaces/notes";
import Modal from "@/components/Modal.vue";

const props = defineProps<{ note: Note }>();
const emit = defineEmits(["delete", "edit"]);

const store = useNotesStore();
const isModalOpen = ref(false);
const selectedNote = ref<Note | null>(null);

const confirmDelete = (note: Note) => {
  selectedNote.value = note;
  isModalOpen.value = true;
};

const deleteNote = () => {
  if (selectedNote.value) {
    emit("delete", selectedNote.value.id);
  }
  isModalOpen.value = false;
};

const toggleCompletion = () => {
  store.toggleNoteCompletion(props.note.id);
};

// Obtener la clase de la etiqueta basada en su color
const getTagClass = (tagName: string) => {
  const tag = store.customTags.find((t) => t.name === tagName);
  if (tag) {
    switch (tag.color) {
      case "blue":
        return "text-blue-600/80 bg-blue-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-blue-500/60";
      case "green":
        return "text-green-600/80 bg-green-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-green-500/60";
      case "red":
        return "text-red-600/60 bg-red-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-red-500/60";
      case "orange":
        return "text-orange-600/60 bg-orange-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-orange-500/60";
      case "yellow":
        return "text-yellow-600/60 bg-yellow-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-yellow-500/60";
      case "lime":
        return "text-lime-600/60 bg-lime-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-lime-500/60";
      case "emerald":
        return "text-emerald-600/60 bg-emerald-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-emerald-500/60";
      case "cyan":
        return "text-cyan-600/60 bg-cyan-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-cyan-500/60";
      case "violet":
        return "text-violet-600/60 bg-violet-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-violet-500/60";
      case "purple":
        return "text-purple-600/60 bg-purple-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-purple-500/60";
      case "fuchsia":
        return "text-fuchsia-600/60 bg-fuchsia-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-fuchsia-500/60";
      case "stone":
        return "text-stone-600/60 bg-stone-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-stone-500/60";
      default:
        return "text-gray-600/80 bg-gray-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-gray-500/60";
    }
  }
  return "text-gray-600/30 bg-gray-200/30 rounded-md px-4 py-1 font-bold border-2 border-dotted border-gray-500/30";
};

// Formateo de fecha y hora
const formattedDate = computed(() => {
  const date = new Date(props.note.date);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
});

const formattedTime = computed(() => {
  const date = new Date(props.note.date);
  return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
});
</script>
