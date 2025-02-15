<template>
  <form @submit.prevent="handleSubmit" class="p-4 space-y-4 bg-white border-2 border-gray-300 rounded-lg shadow">
    <input v-model="noteData.title" placeholder="Título" class="w-full bg-gray-200 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" required />
    <textarea v-model="noteData.content" placeholder="Contenido" class="w-full bg-gray-200 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" required></textarea>

    <!-- Checkboxes para seleccionar múltiples etiquetas -->
    <div class="flex flex-wrap gap-2 mb-4 h-20 overflow-y-auto">
      <label v-for="tag in availableTags" :key="tag" class="flex items-center space-x-2">
        <input type="checkbox" v-model="noteData.tags" :value="tag" class="form-checkbox h-5 w-5 text-blue-600" />
        <span>{{ tag }}</span>
      </label>
    </div>

    <button type="submit" class="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded active:scale-90 transition duration-100">
      {{ isEditing ? "Actualizar" : "Agregar" }} Nota
    </button>

    <button v-if="!isEditing" type="button" @click="cleanForm" class="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded active:scale-90 transition duration-100">
      {{ "Limpiar" }} Nota
    </button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from "vue";
import { useNotesStore } from "@/stores/notes";
import type { Note } from "@/Interfaces/notes";

const props = defineProps<{
  note?: Note;
  closeModal: () => void;
}>();

const emit = defineEmits(["submit"]);

const store = useNotesStore();
const customTags = computed(() => store.customTags);

// Combinar etiquetas predeterminadas y personalizadas
const availableTags = computed(() => {
  const customTagNames = customTags.value.map(tag => tag.name);
  return customTagNames;
});

const noteData = ref<Omit<Note, "id" | "date">>({
  title: "",
  content: "",
  tags: [], // Cambiamos a un array de etiquetas
});

const isEditing = ref(false);

watch(
  () => props.note,
  (newVal) => {
    if (newVal) {
      noteData.value = { ...newVal };
      isEditing.value = true;
    } else {
      noteData.value = { title: "", content: "", tags: [] };
    }
  },
  { immediate: true }
);

const cleanForm = () => {
  noteData.value = { title: "", content: "", tags: [] };
  isEditing.value = false;
};

const validateInput = () => {
  const specialCharsRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,:;!?()\s-]+$/;

  if (!noteData.value.title.trim() || !noteData.value.content.trim()) {
    alert("El título y el contenido no pueden estar vacíos.");
    return false;
  }

  if (!specialCharsRegex.test(noteData.value.title) || !specialCharsRegex.test(noteData.value.content)) {
    alert("El título y el contenido contienen caracteres no permitidos.");
    return false;
  }

  return true;
};

const handleSubmit = () => {
  if (!validateInput()) return;

  const newNote = {
    id: crypto.randomUUID(),
    date: new Date(),
    ...noteData.value,
  };

  emit("submit", newNote);
  noteData.value = { title: "", content: "", tags: [] };
  isEditing.value = false;
  props.closeModal();
};
</script>
