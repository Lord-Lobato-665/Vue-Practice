<script setup lang="ts">

import { ref, Ref } from 'vue';
import ChildComponent from "./ChildComponent.vue";

const mensajePadre = ref("Hola desde el padre");
const mensajeRecibido = ref("");

const manejarEvento = (valor: string) => {
  mensajeRecibido.value = valor;
};

</script>

<template>
  <div class="p-5 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold">Componente Padre
      <ChildComponent :mensaje="mensajePadre" @eventoClick="manejarEvento" />
      <p v-if="mensajeRecibido" class="mt-3 text-green-700 font-semibold">
        Mensaje recibido: {{ mensajeRecibido }}
      </p>
    </h2>
  </div>
</template>
