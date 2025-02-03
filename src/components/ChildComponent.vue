<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

// Prop recibida del padre, el cual tiene por predeterminado que sera de tipo string
// Defineprops nos indica que variable es la que tiene las propiedades que esta pasando el padre
defineProps<{mensaje: string}>();

// Esta constante es un defineEmit que se usa como estructura para hacer un emit
const emit = defineEmits<{
  (event: "eventoClick", valor: string): void
}>();

// Esta constante utiliza la creacion de la estrutura del defineEmit y pasa el evento junto con un valor
const evniarEvento = () => {
  emit("eventoClick", "Mensaje del hijo!")
}
</script>

<template>
  <div class="p-4 bg-yellow-200 rounded shadow">
    <p class="text-lg">{{ mensaje }}</p>
    <button @click="evniarEvento" class="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-md">
      Enviar la padre
    </button>
  </div>
</template>
