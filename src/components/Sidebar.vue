<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <aside class="w-64 h-screen bg-gray-800 text-white p-4">
    <h2 class="text-xl font-bold mb-4">Menú</h2>
    <nav class="space-y-2">
      <RouterLink to="/counter" class="block px-4 py-2 rounded hover:bg-gray-700">Contador</RouterLink>
      <RouterLink to="/todo" class="block px-4 py-2 rounded hover:bg-gray-700">Lista de Tareas</RouterLink>
      <RouterLink to="/parent" class="block px-4 py-2 rounded hover:bg-gray-700">Props Padre-Hijo</RouterLink>
      <RouterLink to="/pinia" class="block px-4 py-2 rounded hover:bg-gray-700">Pinia Store</RouterLink>
    </nav>
  </aside>
</template>
