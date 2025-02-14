<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <div class="flex">
    <!-- Sidebar fijo a la izquierda -->
    <Sidebar />

    <!-- Contenido principal -->
    <main class="flex-1 p-4">
      <RouterView />
    </main> 
  </div>
</template>
