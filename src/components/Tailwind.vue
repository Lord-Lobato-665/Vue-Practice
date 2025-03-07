<script setup lang="ts">
// Importación del Sidebar para incluirlo en la vista
import Sidebar from './Sidebar.vue';
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Contenedor principal centrado -->
    <div class="flex-1 p-10 bg-gray-200 min-h-screen">
      <h1 class="text-3xl font-bold text-center text-gray-700">Galería</h1>
      <div class="grid grid-cols-3 gap-6 mt-6">
        <div class="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 class="text-lg font-semibold text-gray-700">Elemento 1</h2>
          <p class="text-gray-500">Descripción breve</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 class="text-lg font-semibold text-gray-700">Elemento 2</h2>
          <p class="text-gray-500">Descripción breve</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 class="text-lg font-semibold text-gray-700">Elemento 3</h2>
          <p class="text-gray-500">Descripción breve</p>
        </div>
      </div>
    </div>
  </div>
</template>
