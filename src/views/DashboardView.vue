<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Contenedor principal -->
    <div class="flex-1 p-10 bg-white shadow-lg rounded-lg min-h-screen">
      <section
        class="mb-12 p-6 rounded-lg shadow-md bg-gray-100 transition-all duration-300 hover:shadow-lg"
        style="max-height: 500px; overflow-y: auto;"
      >
        <div id="XSS">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Cross-Site Scripting (XSS)</h2>
          <p class="mb-6 text-gray-700">
            XSS permite inyectar scripts maliciosos en páginas web vistas por otros usuarios.
          </p>

          <!-- Formulario -->
          <form @submit.prevent="submitComment" class="mb-6">
            <label for="xssInput" class="block mb-2 font-semibold">Introduce un script:</label>
            <input
              autocomplete="false"
              id="xssInput"
              v-model="CommentUser"
              class="input input-bordered w-full mb-4 p-2 border-gray-300 rounded-lg shadow-sm"
            />
            <button type="submit" class="btn btn-primary px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">Enviar</button>
          </form>

          <!-- Lista de comentarios -->
          <div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Ejemplos básicos de XSS:</h3>
            <ul class="list-disc list-inside text-gray-700">
              <li v-if="loading" class="mb-2 text-gray-500">Cargando comentarios...</li>
              <li v-for="comment, index in comments" :key="index" class="mb-2 bg-white p-4 rounded shadow">
                <p v-html="comment.comment" class="text-gray-800"></p>
              </li>
            </ul>
          </div>

          <!-- Botón mostrar/ocultar prevención -->
          <div class="text-center mt-6">
            <button @click="show = !show" type="button" class="btn btn-primary px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
              Mostrar Prevención de XSS
            </button>
          </div>

          <!-- Prevención de XSS -->
          <div v-if="show" class="mt-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Prevención de XSS:</h3>
            <p class="mb-4 text-gray-700">
              Para prevenir XSS, es importante escapar correctamente los datos de entrada y utilizar métodos seguros para renderizar contenido HTML.
            </p>
            <ul class="list-disc list-inside mb-4 text-gray-700">
              <li>Escapar caracteres especiales en el lado del servidor.</li>
              <li>Utilizar bibliotecas de sanitización de HTML.</li>
              <li>Implementar Content Security Policy (CSP).</li>
            </ul>

            <!-- Ejemplos de XSS -->
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Ejemplos de XSS:</h3>
            <div class="bg-gray-100 p-6 rounded-lg shadow-md">
              <p class="mb-2 font-semibold text-gray-800">1. Botón:</p>
              <pre class="bg-gray-200 p-2 rounded mb-4 overflow-x-auto">
                <code>&lt;button onclick="alert('¡XSS exitoso!')"&gt;Haz clic aquí&lt;/button&gt;</code>
              </pre>

              <p class="mb-2 font-semibold text-gray-800">2. Div:</p>
              <pre class="bg-gray-200 p-2 rounded mb-4 overflow-x-auto">
                <code>&lt;div onclick="alert('¡XSS con div!')" style="border: 2px solid red; padding: 10px;"&gt;Soy un div con XSS&lt;/div&gt;</code>
              </pre>

              <p class="mb-2 font-semibold text-gray-800">3. Enlace:</p>
              <pre class="bg-gray-200 p-2 rounded mb-4 overflow-x-auto">
                <code>&lt;a href="javascript:alert('¡XSS con enlace!')"&gt;Haz clic aquí&lt;/a&gt;</code>
              </pre>

              <p class="mb-2 font-semibold text-gray-800">4. Imagen (img):</p>
              <pre class="bg-gray-200 p-2 rounded mb-4 overflow-x-auto">
                <code>&lt;img src="x" onerror="alert('¡XSS con imagen!')" /&gt;</code>
              </pre>

              <p class="mb-2 font-semibold text-gray-800">5. Iframe:</p>
              <pre class="bg-gray-200 p-2 rounded mb-4 overflow-x-auto">
                <code>&lt;iframe src="javascript:alert('¡XSS con iframe!')"&gt;&lt;/iframe&gt;</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';
import { getCommentService, addCommentService } from '@/services/ApiService';
import type { Comment } from '@/Interfaces/Comment';
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/stores/authStore'; // Importa el store de autenticación

const authStore = useAuthStore(); // Accede al store de autenticación
const comments: Ref<Comment[]> = ref([]); // Lista de comentarios
const CommentUser = ref(''); // Comentario ingresado por el usuario
const show = ref(false); // Mostrar/ocultar sección de prevención
const loading = ref(true); // Estado de carga

// Ejemplos fijos de XSS
const fixedExamples: Comment[] = [
  {
    id: 1,
    user_id: 1,
    comment: `
      <button
        onclick="alert('¡XSS exitoso!')"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Haz clic aquí
      </button>
    `,
  },
  {
    id: 2,
    user_id: 1,
    comment: `
      <img
        src="x"
        onerror="alert('¡XSS con imagen!')"
        alt="XSS"
        class="max-w-full h-auto"
      >
    `,
  },
  {
    id: 3,
    user_id: 1,
    comment: `
      <a
        href="https://userinyerface.com/"
        class="text-blue-600 underline hover:text-blue-800"
      >
        Haz clic aquí
      </a>
    `,
  },
  {
    id: 4,
    user_id: 1,
    comment: `
      <div
        onclick="alert('¡XSS con div!')"
        class="border-2 border-red-500 p-4 text-center"
      >
        Soy un div con XSS
      </div>
    `,
  },
  {
    id: 5,
    user_id: 1,
    comment: `
      <iframe
        src="javascript:alert('¡XSS con iframe!')"
        class="w-full h-32 border border-gray-300"
      ></iframe>
    `,
  },
];

// Función para enviar un comentario
const submitComment = async () => {
  if (CommentUser.value) {
    // Obtén el userId de la sesión y conviértelo a número
    const userId = parseInt(authStore.userId || '0', 10);

    // Envía el userId correcto en la petición
    const response = await addCommentService(userId, CommentUser.value);
    if (response.message) {
      alert(response.message);
    }

    // Recarga los comentarios después de agregar uno nuevo
    await fetchComments();
  }
};

// Función para obtener los comentarios del usuario actual
const fetchComments = async () => {
  const userId = parseInt(authStore.userId || '0', 10);
  const response = await getCommentService(userId);

  // Simula un retraso de 2 segundos para mostrar "Cargando comentarios..."
  setTimeout(() => {
    if (response.results) {
      comments.value = [...fixedExamples, ...response.results]; // Combina ejemplos fijos con los comentarios del servidor
    } else {
      comments.value = fixedExamples; // Si no hay comentarios, muestra solo los ejemplos fijos
    }
    loading.value = false; // Oculta el mensaje de carga
  }, 2000);
};

// Cargar los comentarios cuando el componente se monta
onMounted(async () => {
  await fetchComments();
});
</script>
