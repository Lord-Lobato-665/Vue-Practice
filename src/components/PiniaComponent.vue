<script setup lang="ts">
// Importacion del la funcion que tiene el contexto del store que vamos a utlizar en el componente
import { useCounterStore } from '@/stores/counter';

// Declaromos una constante a la cual se le asigna el contexto que alamcena el metodo useCounterStore
// La funcion useCounterStore posee el store 'counter' el cual requerimos para trabajar
const counterStore = useCounterStore();

</script>

<template>
  <!-- Utilizamos el nombre de la constante que creamos para acceder a las diversas acciones que posee nuestro store -->
  <!-- Como ya traemos el contexto del store 'counter' que reside en useCounterStore podemos usar su contexto global -->
  <div class="p-5 bg-blue-100 rounded-lg shadow">
    <h2 class="text-lg font-bold">Contador Global: {{ counterStore.count }}</h2>
    <div class="flex justify-between mt-4">
      <!-- counterStore ya posee todo lo que tiene el store 'counter' y podemos acceder a sus actions -->
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

</template>
