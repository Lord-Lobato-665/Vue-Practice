<script setup lang="ts">
import Sidebar from './Sidebar.vue';
import { ref } from 'vue';

const count = ref<number>(0);

const increment = () => {
  count.value++;
}

const decrement = () => {
  if (count.value > 0) {
    count.value--;
  } else {
    alert('No puedes decrementar el contador a menos de 0');
  }
}

const reset = () => {
  count.value = 0;
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />
    <!-- Contenedor principal centrado -->
    <div class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-3xl font-bold my-5">Contador</h1>
        <h2 class="text-2xl font-bold">{{ count }}</h2>
        <div class="mt-5 space-x-4">
          <button
            @click="increment"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
          >
            Incrementar
          </button>
          <button
            @click="decrement"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
          >
            Decrementar
          </button>
          <button
            @click="reset"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
          >
            Resetear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
