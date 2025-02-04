<script setup lang="ts">

import { ref } from 'vue';
import ChildComponent from "./ChildComponent.vue";

const mensajePadre = ref("Hola desde el padre");
const mensajeRecibido = ref("");

// Esta const tiene como funcion manejar el evento que manda el hijo y alamcena el nombre en su contexto propio
// El cual es mensajeRecibido
// Esta funcion tiene un parametro el cuaL es valor y determinar el mensaje que mostrara el padre y que
// Recibio del hijo
const manejarEvento = (valor: string) => {
  // Almacenamos el valor que mando el evento del hijo en la constante que mostrara el padre en su contexto
  mensajeRecibido.value = valor;
};

</script>

<template>
  <div class="p-5 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold">Componente Padre
      <!-- El componente hijo requiere del prop que le pasa el padre el cual es el mensaje que mostrara -->
      <!-- A su vez el componente hijo ejecuta un evento con un click y el padre lo recibe -->
      <!-- El componente hijo manda un mensaje y el padre con su manejador de evento lo procesa para mostrarlo -->
      <ChildComponent :mensaje="mensajePadre" @eventoClick="manejarEvento" />
      <p v-if="mensajeRecibido" class="mt-3 text-green-700 font-semibold">
        Mensaje recibido: {{ mensajeRecibido }}
      </p>
    </h2>
  </div>
</template>
