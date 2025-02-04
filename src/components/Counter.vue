
<script setup lang="ts">

// Importacion del ref
// El ref sirve para manipular un elemento de forma imperativa o acceder a metodos/propiedades
import {ref} from 'vue'

// Estado reativo
// Permite que cualquier cambio que se le haga a count se actualice de forma automatica en la UI
const count = ref<number>(0);

// Funcion para incrementar
// La funcion flecha es aplicable en este caso por el proceso sencillo que debe ejecutar y que necesita de this
const increment = () => {
  // El .value se utiliza porque ref devuelve un objeti reactivo con una propiedad value
  // Si en su lugar pusieramos count++ estariamos afectando al objeto y no a su valor interno
  count.value++;
}

// Funcion para decrementar
const decrement = () => {
  if (count.value > 0) {
    count.value--;
  } else {
    alert('No puedes decrementar el contador a menos de 0');
  }
}

// Funcion para reiniciar
const reset = () => {
  count.value = 0;
}

</script>

<template>

  <div class="flex flex-col items-center p-5 bg-gray-100 rounded-lg shadow-mb">
    <h1 class="text-3xl font-bold my-5">Contador</h1>
    <h2 class="text-2xl font-bold">{{ count }}</h2>
    <button
    @click="increment"
    class="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
    >
    Incrementar
    </button>
    <button
    @click="decrement"
    class="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
    >
    Decrementar
    </button>
    <button
    @click="reset"
    class="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
    >
    Resetear
    </button>
  </div>

</template>
