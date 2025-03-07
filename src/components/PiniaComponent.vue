<script setup lang="ts">
// Importacion del la funcion que tiene el contexto del store que vamos a utlizar en el componente
import { useCounterStore } from '@/stores/counter';
import Sidebar from './Sidebar.vue';

// Declaromos una constante a la cual se le asigna el contexto que alamcena el metodo useCounterStore
// La funcion useCounterStore posee el store 'counter' el cual requerimos para trabajar
const counterStore = useCounterStore();
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Contenedor principal centrado -->
    <div class="flex-1 flex items-center justify-center p-5">
      <div class="w-full max-w-xl p-6 bg-white rounded-lg shadow-md text-center">
        <h2 class="text-lg font-bold">Contador Global: {{ counterStore.count }}</h2>
        <div class="flex justify-between mt-4">
          <!-- Botones de acción para incrementar, decrementar y resetear -->
          <button @click="counterStore.increment" class="mx-1 mt-3 px-4 py-2 bg-blue-500 text-white rounded">
            Incrementar
          </button>
          <button @click="counterStore.decrement" class="mx-1 mt-3 px-4 py-2 bg-blue-500 text-white rounded">
            Decrementar
          </button>
          <button @click="counterStore.reset" class="mx-1 mt-3 px-4 py-2 bg-blue-500 text-white rounded">
            Resetear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
