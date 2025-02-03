<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Counter from './components/Counter.vue';
import TodoList from './components/TodoList.vue';
import ParentComponent from './components/ParentComponent.vue';
</script>

<template>

  <main class="flex justify-center items-center min-h-screen bg-gray-200">
    <ParentComponent />
  </main>

</template>
