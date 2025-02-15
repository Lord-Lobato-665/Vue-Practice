<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50">
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-lg font-bold mb-4">Personalización de Etiquetas</h2>

      <!-- Formulario para agregar/editar etiquetas -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="tagName"
          placeholder="Nombre de la etiqueta"
          class="w-full border border-gray-300 rounded-md p-2"
          required
        />
        <select
          v-model="tagColor"
          :class="getSelectClass(tagColor)"
          class="w-full border border-gray-300 rounded-md p-2 transition-colors duration-200 focus:outline-none"
        >
          <option
            v-for="color in colors"
            :key="color"
            :value="color"
            :class="getOptionClass(color)"
          >
            {{ color }}
          </option>
        </select>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 active:scale-90 transition duration-100"
        >
          {{ isEditing ? "Actualizar" : "Agregar" }} Etiqueta
        </button>
      </form>

      <!-- Lista de etiquetas con scroll -->
      <div class="mt-4 h-28 overflow-y-auto">
        <div
          v-for="tag in customTags"
          :key="tag.name"
          class="flex items-center justify-between p-2 border-b"
        >
          <span :class="getTagClass(tag.color)">{{ tag.name }}</span>
          <div>
            <button @click="editTag(tag)" class="text-blue-500 hover:text-blue-700">
              Editar
            </button>
            <button
              @click="deleteTag(tag.name)"
              class="text-red-500 hover:text-red-700 ml-2"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <button
        @click="closeModal"
        class="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 active:scale-90 transition duration-100"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useNotesStore } from "@/stores/notes";
import type { CustomTag } from "@/Interfaces/tags";

const store = useNotesStore();
const tagName = ref("");
const tagColor = ref("blue");
const isEditing = ref(false);
const editingTagName = ref("");

const colors = [
  "blue",
  "green",
  "red",
  "orange",
  "yellow",
  "lime",
  "emerald",
  "cyan",
  "violet",
  "purple",
  "fuchsia",
  "stone",
];

const customTags = computed(() => store.customTags);

// Función para obtener la clase de la etiqueta
const getTagClass = (color: string) => {
  switch (color) {
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
};

// Función para obtener la clase del select
const getSelectClass = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-100 border-blue-300 text-blue-700";
    case "green":
      return "bg-green-100 border-green-300 text-green-700";
    case "red":
      return "bg-red-100 border-red-300 text-red-700";
    case "orange":
      return "bg-orange-100 border-orange-300 text-orange-700";
    case "yellow":
      return "bg-yellow-100 border-yellow-300 text-yellow-700";
    case "lime":
      return "bg-lime-100 border-lime-300 text-lime-700";
    case "emerald":
      return "bg-emerald-100 border-emerald-300 text-emerald-700";
    case "cyan":
      return "bg-cyan-100 border-cyan-300 text-cyan-700";
    case "violet":
      return "bg-violet-100 border-violet-300 text-violet-700";
    case "purple":
      return "bg-purple-100 border-purple-300 text-purple-700";
    case "fuchsia":
      return "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-700";
    case "stone":
      return "bg-stone-100 border-stone-300 text-stone-700";
    default:
      return "bg-gray-100 border-gray-300 text-gray-700";
  }
};

// Función para obtener la clase de la opción del select
const getOptionClass = (color: string) => {
  switch (color) {
    case "blue":
      return "text-blue-600 bg-blue-100";
    case "green":
      return "text-green-600 bg-green-100";
    case "red":
      return "text-red-600 bg-red-100";
    case "orange":
      return "text-orange-600 bg-orange-100";
    case "yellow":
      return "text-yellow-600 bg-yellow-100";
    case "lime":
      return "text-lime-600 bg-lime-100";
    case "emerald":
      return "text-emerald-600 bg-emerald-100";
    case "cyan":
      return "text-cyan-600 bg-cyan-100";
    case "violet":
      return "text-violet-600 bg-violet-100";
    case "purple":
      return "text-purple-600 bg-purple-100";
    case "fuchsia":
      return "text-fuchsia-600 bg-fuchsia-100";
    case "stone":
      return "text-stone-600 bg-stone-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

// Validación del nombre de la etiqueta
const validateTagName = () => {
  const specialCharsRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/;

  if (!tagName.value.trim()) {
    alert("El nombre de la etiqueta no puede estar vacío.");
    return false;
  }

  if (!specialCharsRegex.test(tagName.value)) {
    alert("El nombre de la etiqueta contiene caracteres no permitidos.");
    return false;
  }

  // Verificar si el nombre de la etiqueta ya existe
  const tagExists = customTags.value.some(
    (tag) => tag.name.toLowerCase() === tagName.value.toLowerCase()
  );

  if (tagExists && !isEditing.value) {
    alert("Ya existe una etiqueta con ese nombre.");
    return false;
  }

  return true;
};

const handleSubmit = () => {
  if (!validateTagName()) return;

  const newTag: CustomTag = {
    name: tagName.value,
    color: tagColor.value,
  };

  if (isEditing.value) {
    store.updateCustomTag(editingTagName.value, newTag);
  } else {
    store.addCustomTag(newTag);
  }

  resetForm();
};

const editTag = (tag: CustomTag) => {
  tagName.value = tag.name;
  tagColor.value = tag.color;
  isEditing.value = true;
  editingTagName.value = tag.name;
};

const deleteTag = (tagName: string) => {
  store.deleteCustomTag(tagName);
};

const resetForm = () => {
  tagName.value = "";
  tagColor.value = "blue";
  isEditing.value = false;
  editingTagName.value = "";
};

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
  resetForm();
};
</script>
