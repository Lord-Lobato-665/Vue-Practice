<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

// Usamos useAuthStore para verificar el estado de la sesión
const authStore = useAuthStore();
const router = useRouter();

// Computed para verificar si el usuario está autenticado
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Redirigir al usuario según su estado de sesión cuando la página 404 se monta
onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/dashboard');
  } else {
    router.push('/login');
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-6xl font-bold text-orange-500">404</h1>
    <p class="text-xl text-gray-600">Oops! Página no encontrada.</p>
    <RouterLink to="/" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700">
      Volver al inicio
    </RouterLink>
  </div>
</template>
