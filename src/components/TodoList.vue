<script setup lang="ts">

import {reactive, ref} from "vue";

// Estado reactivo para la lista
// La funcion reactive crea un estado reactivado en el que los cambios en los datos se actualizan de forma
// automatica en las vistas donde estan siendo utilizados
// La estrutura indidca que es un arreglo de objetos y dichos objetos tiene dos propiedades id y text
const todos = reactive<{id: number; test: string}[]>([]);

// Nuevo item en la lista
// newTodo es un valor reactivo que nos permitira almacenar un texto
const newTodo = ref("");

// Agregar un elemento
// Esta es una funcion flecha que representa la forma de hacer una adicion a la lista
const addTodo = () => {
  // Validamos que el texto no contenga espacios en principio y fin, ademas que el texto no este vacio
  if (newTodo.value.trim() !== "") {
    // Mediante push agregamos al arreglo todos el valor del texto al final de arreglo
    // Como id usamos la funcion date para ingresar la feche como id y como text tomamos el valor ingresado
    todos.push({id: Date.now(), text: newTodo.value});
    // Una vez ingresado el valor limpiarmos el texto que contien el newTodo
    newTodo.value = "";
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
    <h2 class="flex gap-2 mb-3"></h2>
    <!-- v-model crea una vinculacion bidereccional entre el campo de entrada y la variable newTodo -->
    <!-- @click es una manejador de eventos que se utiliza para llamar a la funcion addTodo -->
      <input
      v-model="newTodo"
      type="text"
      placeholder="Nueva tarea"
      class="border rounded p-2 w-full"
      >
      <button @click="addTodo" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
        Agregar Tarea
      </button>
  </div>
  <!-- v-for es una directiva de vue para iterar sobre un arreglo en este caso es todo -->
  <!-- key es la clave unica para cada elemento de la lista esto ayuda a renderizar los elementos -->
  <ul>
    <li v-for="todo in todos" :key="todo.id" class="p-2 border-b">{{ todo.text }}</li>
  </ul>
</template>
