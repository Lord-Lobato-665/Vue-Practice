<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

// Computed para verificar autenticación
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Obtener el nombre del usuario logueado
const userRole = computed(() => authStore.userRole || 'Rol desconocido');

// Función para cerrar sesión
const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<template>
  <aside class="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
    <div>
      <!-- Mensaje de bienvenida -->
      <div class="text-lg font-semibold mb-4">
        Bienvenido, <span class="text-green-400">{{ userRole }}</span>
      </div>

      <h2 class="text-xl font-bold mb-4">Menú</h2>
      <nav class="space-y-2">
        <!-- Solo se muestra si el usuario está autenticado -->
        <RouterLink v-if="isAuthenticated" to="/dashboard" class="block px-4 py-2 rounded hover:bg-gray-700">
          Dashboard
        </RouterLink>

        <RouterLink to="/counter" class="block px-4 py-2 rounded hover:bg-gray-700">Counter</RouterLink>
        <RouterLink to="/parent" class="block px-4 py-2 rounded hover:bg-gray-700">Props Parent-Child</RouterLink>
        <RouterLink to="/pinia" class="block px-4 py-2 rounded hover:bg-gray-700">Pinia Store</RouterLink>
        <RouterLink to="/tailwind" class="block px-4 py-2 rounded hover:bg-gray-700">Tailwind Practice</RouterLink>
        <RouterLink to="/notelist" class="block px-4 py-2 rounded hover:bg-gray-700">Note List</RouterLink>
        <RouterLink to="/slqinjection" class="block px-4 py-2 rounded hover:bg-gray-700">SQL Injection</RouterLink>
      </nav>
    </div>

    <!-- Botón de cerrar sesión (solo visible si autenticado) -->
    <button
      v-if="isAuthenticated"
      @click="logout"
      class="w-full bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200 active:scale-90 transition"
    >
      Cerrar sesión
    </button>
  </aside>
</template>
