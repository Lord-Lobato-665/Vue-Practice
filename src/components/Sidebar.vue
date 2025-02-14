<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <aside class="w-64 h-screen bg-gray-800 text-white p-4">
    <h2 class="text-xl font-bold mb-4">Menú</h2>
    <nav class="space-y-2">
      <RouterLink to="/counter" class="block px-4 py-2 rounded hover:bg-gray-700">Counter</RouterLink>
      <RouterLink to="/parent" class="block px-4 py-2 rounded hover:bg-gray-700">Props Parent-Child</RouterLink>
      <RouterLink to="/pinia" class="block px-4 py-2 rounded hover:bg-gray-700">Pinia Store</RouterLink>
      <RouterLink to="/tailwind" class="block px-4 py-2 rounded hover:bg-gray-700">Tailwind Practice</RouterLink>
      <RouterLink to="/notelist" class="block px-4 py-2 rounded hover:bg-gray-700">Note List</RouterLink>
    </nav>
  </aside>
</template>
