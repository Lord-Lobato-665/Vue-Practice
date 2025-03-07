<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';
import ChildComponent from './ChildComponent.vue';

const mensajePadre = ref("Hola desde el padre");
const mensajeRecibido = ref("");

// Función para manejar el evento enviado por el hijo
const manejarEvento = (valor: string) => {
  mensajeRecibido.value = valor;
};
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Contenedor principal centrado -->
    <div class="flex-1 flex items-center justify-center p-5">
      <div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md text-center">
        <h2 class="text-xl font-bold">Componente Padre</h2>

        <!-- Componente Hijo -->
        <ChildComponent :mensaje="mensajePadre" @eventoClick="manejarEvento" />

        <!-- Mensaje recibido del hijo -->
        <p v-if="mensajeRecibido" class="mt-3 text-green-700 font-semibold">
          Mensaje recibido: {{ mensajeRecibido }}
        </p>
      </div>
    </div>
  </div>
</template>
