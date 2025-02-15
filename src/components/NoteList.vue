<template>
  <div>
    <!-- Filtros -->
    <div class="relative">
      <div
        v-if="isFilterOpen"
        class="absolute bg-white shadow-md rounded-md p-4 w-72 mt-2 right-0 top-0 z-10 transition-all duration-300"
      >
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Filtros</h3>

        <!-- Filtro por estado de completado -->
        <select
          v-model="selectedCompletion"
          :class="getCompletionSelectClass(selectedCompletion)"
          class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <option value="">Todas</option>
          <option value="completed">Completadas</option>
          <option value="incomplete">No completadas</option>
        </select>

        <!-- Filtro por etiqueta -->
        <select
          v-model="selectedTag"
          :class="getSelectClass(selectedTag)"
          class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <option value="">Todas</option>
          <option
            v-for="tag in availableTags"
            :key="tag"
            :value="tag"
            :class="getOptionClass(tag)"
          >
            {{ tag }}
          </option>
        </select>

        <!-- Filtro por título -->
        <input
          v-model="searchTitle"
          placeholder="Buscar por título..."
          class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <!-- Filtro por contenido -->
        <input
          v-model="searchContent"
          placeholder="Buscar por contenido..."
          class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <!-- Ordenar por fecha -->
        <select
          v-model="sortOrder"
          class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Ordenar por fecha</option>
          <option value="desc">Más recientes primero</option>
          <option value="asc">Más antiguas primero</option>
        </select>

        <!-- Botón para limpiar filtros -->
        <button
          @click="clearFilters"
          class="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>

    <!-- Botones de eliminación -->
    <div class="mt-4 flex gap-2">
      <button
        @click="showDeleteAllModal = true"
        class="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-200 active:scale-90"
      >
        Borrar todas las notas
      </button>

      <!-- Botón combinado con el menú desplegable -->
      <div class="relative">
        <button
          @click="isDeleteMenuOpen = !isDeleteMenuOpen"
          class="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-200 flex items-center justify-between w-48"
        >
          Borrar por etiqueta
          <span class="ml-2">▼</span>
        </button>

        <div
          v-if="isDeleteMenuOpen"
          class="absolute bg-white shadow-md rounded-md p-4 w-48 mt-2 right-0 z-10"
        >
          <!-- Selector de etiquetas -->
          <select
            v-model="selectedTagDelete"
            :class="getSelectClass(selectedTagDelete)"
            class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <option value="" disabled>Escoger Etiqueta</option>
            <option
              v-for="tag in availableTags"
              :key="tag"
              :value="tag"
              :class="getOptionClass(tag)"
            >
              {{ tag }}
            </option>
          </select>

          <!-- Botón para abrir modal de confirmación -->
          <button
            @click="showConfirmDeleteModal"
            class="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 active:scale-90"
            :disabled="!selectedTagDelete"
          >
            Confirmar
          </button>
        </div>
      </div>

      <!-- Botón para abrir filtros -->
      <div class="flex items-center gap-2">
        <button
          @click="isFilterOpen = !isFilterOpen"
          class="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200 active:scale-90"
        >
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
    <div
      v-if="filteredNotes.length === 0 && !isLoading"
      class="text-center text-gray-500 mt-4"
    >
      No hay notas disponibles.
    </div>

    <div class="max-h-[380px] overflow-y-auto mt-4" v-if="!isLoading">
      <NoteItem
        v-for="note in filteredNotes"
        :key="note.id"
        :note="note"
        @edit="$emit('edit', note)"
        @delete="$emit('delete', note.id)"
      />
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
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 active:scale-90 transition duration-100"
          >
            Cancelar
          </button>
          <button
            @click="handleConfirmDelete"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 active:scale-90 transition duration-100"
          >
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
const selectedCompletion = ref(""); // Nuevo filtro por estado de completado
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

// Computed para obtener las etiquetas disponibles
const availableTags = computed(() => {
  return store.customTags.map((tag) => tag.name);
});

// Función para obtener la clase del select de completado
const getCompletionSelectClass = (completionStatus: string) => {
  switch (completionStatus) {
    case "completed":
      return "bg-green-100 border-green-300 text-green-700";
    case "incomplete":
      return "bg-gray-100 border-gray-300 text-gray-700";
    default:
      return "bg-gray-100 border-gray-300 text-gray-700";
  }
};

// Función para obtener la clase del select de etiquetas
const getSelectClass = (tagName: string) => {
  const tag = store.customTags.find((t) => t.name === tagName);
  if (tag) {
    switch (tag.color) {
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
  }
  return "bg-gray-100 border-gray-300 text-gray-700";
};

// Función para obtener la clase de la opción del select
const getOptionClass = (tagName: string) => {
  const tag = store.customTags.find((t) => t.name === tagName);
  if (tag) {
    switch (tag.color) {
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
  }
  return "text-gray-600 bg-gray-100";
};

// Computed para filtrar notas
const filteredNotes = computed(() => {
  let notes = store.notes;

  // Filtro por estado de completado
  if (selectedCompletion.value === "completed") {
    notes = notes.filter((note) => note.completed);
  } else if (selectedCompletion.value === "incomplete") {
    notes = notes.filter((note) => !note.completed);
  }

  // Filtro por etiqueta
  if (selectedTag.value) {
    notes = notes.filter((note) => note.tags.includes(selectedTag.value));
  }

  // Filtro por título
  if (searchTitle.value.trim()) {
    notes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTitle.value.toLowerCase())
    );
  }

  // Filtro por contenido
  if (searchContent.value.trim()) {
    notes = notes.filter((note) =>
      note.content.toLowerCase().includes(searchContent.value.toLowerCase())
    );
  }

  // Ordenar por fecha
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
  selectedCompletion.value = "";
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
  // Buscar la etiqueta seleccionada en las etiquetas personalizadas
  const selectedTagObj = store.customTags.find((tag) => tag.name === selectedTag.value);

  // Si la etiqueta seleccionada es una etiqueta personalizada, usar su color
  if (selectedTagObj) {
    switch (selectedTagObj.color) {
      case "blue":
        return "text-blue-600/80 bg-blue-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-blue-500/60";
      case "green":
        return "text-green-600/80 bg-green-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-green-500/60";
      case "red":
        return "text-red-600/60 bg-red-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-red-500/60";
      case "orange":
        return "text-orange-600/60 bg-orange-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-orange-500/60";
      case "yellow":
        return "text-yellow-600/60 bg-yellow-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-yellow-500/60";
      case "lime":
        return "text-lime-600/60 bg-lime-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-lime-500/60";
      case "emerald":
        return "text-emerald-600/60 bg-emerald-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-emerald-500/60";
      case "cyan":
        return "text-cyan-600/60 bg-cyan-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-cyan-500/60";
      case "violet":
        return "text-violet-600/60 bg-violet-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-violet-500/60";
      case "purple":
        return "text-purple-600/60 bg-purple-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-purple-500/60";
      case "fuchsia":
        return "text-fuchsia-600/60 bg-fuchsia-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-fuchsia-500/60";
      case "stone":
        return "text-stone-600/60 bg-stone-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-stone-500/60";
      default:
        return "text-gray-600/80 bg-gray-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-gray-500/60";
    }
  }

  // Si no hay una etiqueta seleccionada, usar el color predeterminado
  return "text-gray-600/80 bg-gray-200/60 rounded-md px-4 py-1.5 font-bold border-2 border-solid border-gray-500/60";
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
  }, 1000);
});
</script>
