<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Contenedor principal -->
    <div class="flex-1 p-10 bg-white shadow-lg rounded-lg min-h-screen">
      <div class="max-h-[400px] overflow-y-auto">
        <h1 class="text-2xl font-bold mb-4">SQL Injection Demo</h1>

        <!-- Formulario para crear un item -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-2">Crear Item</h2>
          <form @submit.prevent="createItem" class="space-y-4">
            <input v-model="newItem.name" placeholder="Nombre" class="p-2 border rounded" />
            <input v-model="newItem.description" placeholder="Descripción" class="p-2 border rounded" />

            <!-- Select para elegir consulta personalizada -->
            <select v-model="selectedQuery" class="p-2 border rounded">
              <option value="">Seleccionar consulta adicional</option>
              <option value="UPDATE items SET name = 'hacked' WHERE id = 4">Actualizar item con ID 4</option>
              <option value="UPDATE items SET name = 'hacked' WHERE id = 5">Actulizar item con ID 5</option>
            </select>

            <button type="submit" class="p-2 bg-blue-500 text-white rounded">Crear</button>
          </form>
        </div>

        <!-- Lista de items -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-2">Items</h2>
          <ul>
            <li v-for="item in items" :key="item.id" class="mb-2">
              {{ item.name }} - {{ item.description }}
              <button @click="deleteItem(item.id)" class="ml-2 p-1 bg-red-500 text-white rounded">Eliminar</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import Sidebar from '@/components/Sidebar.vue';

export default defineComponent({
  name: 'SqlInjectionDemo',
  components: {
    Sidebar,
  },
  setup() {
    const newItem = ref({ name: '', description: '' });
    const items = ref<any[]>([]);
    const selectedQuery = ref('');

    const fetchItems = async () => {
      const response = await axios.get('http://localhost:3000/items');
      items.value = response.data;
    };

    const createItem = async () => {
      const requestData = {
        name: newItem.value.name,
        description: newItem.value.description,
        customQuery: selectedQuery.value,  // Agregamos la consulta seleccionada
      };
      await axios.post('http://localhost:3000/items', requestData);
      newItem.value = { name: '', description: '' };
      selectedQuery.value = ''; // Resetear la consulta seleccionada
      await fetchItems();
    };

    const deleteItem = async (id: number) => {
      await axios.delete(`http://localhost:3000/items/${id}`);
      await fetchItems();
    };

    fetchItems();

    return {
      newItem,
      items,
      selectedQuery,
      createItem,
      deleteItem,
    };
  },
});
</script>
