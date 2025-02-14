<template>
  <div>
    <!-- Filtros -->
    <div class="relative">
      <div v-if="isFilterOpen" class="absolute bg-white shadow-md rounded-md p-4 w-72 mt-2 right-0 top-0 z-10 transition-all duration-300">
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Filtros</h3>

        <!-- Filtro por etiqueta -->
        <select v-model="selectedTag" class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Todas</option>
          <option value="personal">Personal</option>
          <option value="trabajo">Trabajo</option>
          <option value="urgente">Urgente</option>
        </select>

        <!-- Filtro por título -->
        <input v-model="searchTitle" placeholder="Buscar por título..." class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <!-- Filtro por contenido -->
        <input v-model="searchContent" placeholder="Buscar por contenido..." class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <!-- Ordenar por fecha -->
        <select v-model="sortOrder" class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Ordenar por fecha</option>
          <option value="desc">Más recientes primero</option>
          <option value="asc">Más antiguas primero</option>
        </select>

        <!-- Botón para limpiar filtros -->
        <button @click="clearFilters" class="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200">
          Limpiar Filtros
        </button>
      </div>
    </div>

    <!-- Botones de eliminación -->
    <div class="mt-4 flex gap-2">
      <button @click="showDeleteAllModal = true" class="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-200 active:scale-90">
        Borrar todas las notas
      </button>

      <!-- Botón combinado con el menú desplegable -->
      <div class="relative">
        <button @click="isDeleteMenuOpen = !isDeleteMenuOpen" class="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-200 flex items-center justify-between w-48">
          Borrar por etiqueta
          <span class="ml-2">▼</span>
        </button>

        <div v-if="isDeleteMenuOpen" class="absolute bg-white shadow-md rounded-md p-4 w-48 mt-2 right-0 z-10">
          <!-- Selector de etiquetas -->
          <select v-model="selectedTagDelete" class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>Escoger Etiqueta</option>
            <option value="personal">Personal</option>
            <option value="trabajo">Trabajo</option>
            <option value="urgente">Urgente</option>
          </select>

          <!-- Botón para abrir modal de confirmación -->
          <button @click="showConfirmDeleteModal" class="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 active:scale-90" :disabled="!selectedTagDelete">
            Confirmar
          </button>
        </div>
      </div>

      <!-- Botón para abrir filtros -->
      <div class="flex items-center gap-2">
        <button @click="isFilterOpen = !isFilterOpen" class="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200 active:scale-90">
          Filtros
        </button>

        <div :class="taskCounterClass">
          <span class="font-bold">Notas Totales: {{ filteredNotes.length }}</span>
        </div>
      </div>
    </div>

    <!-- Simulación de carga -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <span class="text-gray-600 font-semibold">Cargando notas...</span>
    </div>

    <!-- Lista de notas filtradas -->
    <div v-if="filteredNotes.length === 0 && !isLoading" class="text-center text-gray-500 mt-4">
      No hay notas disponibles.
    </div>

    <div class="max-h-[380px] overflow-y-auto mt-4" v-if="!isLoading">
      <NoteItem v-for="note in filteredNotes" :key="note.id" :note="note" @edit="$emit('edit', note)" @delete="$emit('delete', note.id)" />
    </div>

    <!-- Modal genérico de confirmación -->
    <modal v-if="showDeleteAllModal || showDeleteTagModal" @close="closeModal">
      <template #header>
        <h3 class="text-lg font-semibold text-gray-800">Confirmar Eliminación</h3>
      </template>

      <template #body>
        <p class="text-gray-600 mt-2">{{ modalMessage }}</p>
      </template>

      <template #footer>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 active:scale-90 transition duration-100">
            Cancelar
          </button>
          <button @click="handleConfirmDelete" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 active:scale-90 transition duration-100">
            Confirmar
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useNotesStore } from "@/stores/notes";
import NoteItem from "./NoteItem.vue";
import Modal from "./Modal.vue";

const store = useNotesStore();

// Estado de los filtros
const selectedTag = ref("");
const searchTitle = ref("");
const searchContent = ref("");
const sortOrder = ref("");
const isFilterOpen = ref(false);
const isDeleteMenuOpen = ref(false); // Controla la visibilidad del menú
const selectedTagDelete = ref(""); // Almacena la etiqueta seleccionada

// Estado para el modal de eliminar todas las notas
const showDeleteAllModal = ref(false);
const showDeleteTagModal = ref(false); // Modal para eliminar por etiqueta

// Mensaje del modal según la acción
const modalMessage = computed(() => {
  if (showDeleteAllModal.value) {
    return "¿Estás seguro de que deseas borrar todas las notas?";
  }
  return "¿Estás seguro de que deseas borrar las notas con esta etiqueta?";
});

// Estado para controlar la simulación de carga
const isLoading = ref(true);

// Computed para filtrar notas
const filteredNotes = computed(() => {
  let notes = store.notes;

  if (selectedTag.value) {
    notes = notes.filter((note) => note.tags.includes(selectedTag.value));
  }

  if (searchTitle.value.trim()) {
    notes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTitle.value.toLowerCase())
    );
  }

  if (searchContent.value.trim()) {
    notes = notes.filter((note) =>
      note.content.toLowerCase().includes(searchContent.value.toLowerCase())
    );
  }

  if (sortOrder.value) {
    notes = [...notes].sort((a, b) => {
      return sortOrder.value === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  return notes;
});

// Función para limpiar filtros
const clearFilters = () => {
  selectedTag.value = "";
  searchTitle.value = "";
  searchContent.value = "";
  sortOrder.value = "";
};

// Función para borrar por etiqueta
const deleteByTag = () => {
  if (selectedTagDelete.value) {
    store.deleteNotesByTag(selectedTagDelete.value);
    selectedTagDelete.value = "";
    showDeleteTagModal.value = false; // Cierra el modal después de eliminar
  }
};

// Función para borrar todas las notas
const deleteAllNotes = () => {
  store.deleteAllNotes();
  showDeleteAllModal.value = false; // Cierra el modal después de eliminar
};

// Lógica para cambiar la clase del contador de notas dinámicamente
const taskCounterClass = computed(() => {
  switch (selectedTag.value) {
    case "personal":
      return "text-blue-600/80 bg-blue-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-blue-500/60";
    case "trabajo":
      return "text-green-600/80 bg-green-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-green-500/60";
    case "urgente":
      return "text-red-600/60 bg-red-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-red-500/60";
    default:
      return "text-gray-600/80 bg-gray-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-gray-500/60";
  }
});

// Función para manejar la confirmación de eliminación
const handleConfirmDelete = () => {
  if (showDeleteAllModal.value) {
    deleteAllNotes();
  } else if (showDeleteTagModal.value) {
    deleteByTag();
  }
};

// Función para abrir el modal de confirmación
const showConfirmDeleteModal = () => {
  if (selectedTagDelete.value) {
    showDeleteTagModal.value = true; // Muestra el modal para borrar por etiqueta
  }
};

// Función para cerrar el modal
const closeModal = () => {
  showDeleteAllModal.value = false;
  showDeleteTagModal.value = false;
};

// Simulamos la carga de notas después de 2 segundos
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false; // Después de 2 segundos, las notas se muestran
  }, 2000);
});
</script>
