<template>
  <div class="p-4 bg-gray-100 border-2 border-gray-400 rounded-lg shadow mb-4">
    <h3 class="text-lg font-bold mb-3">{{ note.title }}</h3>
    <p class="text-sm mb-3">{{ note.content }}</p>
    <p class="text-xs text-gray-500 mb-3">Creado el {{ formattedDate }} a las {{ formattedTime }}</p>

    <!-- Mostrar todas las etiquetas -->
    <div class="flex flex-wrap gap-2 mb-3">
      <span v-for="tag in note.tags" :key="tag" :class="tagClass(tag)">
        {{ tag }}
      </span>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex space-x-2">
        <button @click="$emit('edit', note)" class="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 active:scale-90 transition duration-100">
          Editar
        </button>
        <button @click="confirmDelete(note)" class="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 active:scale-90 transition duration-100">
          Eliminar
        </button>
      </div>
    </div>
  </div>

  <!-- Modal de Confirmación -->
  <Modal v-if="isModalOpen">
    <template #header>
      <h2 class="text-lg font-bold">Confirmar Eliminación</h2>
    </template>

    <template #body>
      <p>¿Estás seguro de que deseas eliminar la nota <strong>{{ selectedNote?.title }}</strong>?</p>
    </template>

    <template #footer>
      <div class="flex justify-end space-x-2">
        <button @click="isModalOpen = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 active:scale-90 transition duration-100">
          Cancelar
        </button>
        <button @click="deleteNote" class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 active:bg-red-700 active:scale-90 transition duration-100">
          Confirmar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from "vue";
import type { Note } from "@/Interfaces/notes";
import Modal from "@/components/Modal.vue";

const props = defineProps<{ note: Note }>();
const emit = defineEmits(["delete"]);

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

// Estilos dinámicos de etiquetas
const tagClass = (tag: string) => {
  switch (tag) {
    case "personal":
      return "text-blue-600/80 bg-blue-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-blue-500/60";
    case "trabajo":
      return "text-green-600/80 bg-green-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-green-500/60";
    case "urgente":
      return "text-red-600/60 bg-red-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-red-500/60";
    default:
      return "text-gray-600/80 bg-gray-200/60 rounded-md px-4 py-1 font-bold border-2 border-solid border-gray-500/60";
  }
};

// Formateo de fecha y hora
const formattedDate = computed(() => {
  const date = new Date(props.note.date);
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
});

const formattedTime = computed(() => {
  const date = new Date(props.note.date);
  return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
});
</script>
