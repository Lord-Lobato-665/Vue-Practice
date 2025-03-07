<script setup lang="ts">
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Reglas de validación
const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, { email, password });

const handleLogin = async () => {
  // Validar el formulario
  const isValid = await v$.value.$validate();

  if (!isValid) {
    errorMessage.value = 'Por favor, corrige los errores en el formulario.';
    return;
  }

  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = 'Credenciales inválidas. Inténtalo de nuevo.';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-600">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Iniciar Sesión</h2>

      <!-- Formulario de Login -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Campo de correo electrónico -->
        <div class="mb-4">
          <label class="block text-gray-700">Correo Electrónico</label>
          <input
            v-model="email"
            type="email"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu correo"
          />
          <p v-if="v$.email.$error" class="text-red-500 text-sm mt-1">
            {{ v$.email.$errors[0]?.$message }}
          </p>
        </div>

        <!-- Campo de contraseña -->
        <div class="mb-4">
          <label class="block text-gray-700">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu contraseña"
          />
          <p v-if="v$.password.$error" class="text-red-500 text-sm mt-1">
            {{ v$.password.$errors[0]?.$message }}
          </p>
        </div>

        <!-- Mensaje de error -->
        <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>

        <!-- Botón de inicio de sesión -->
        <button
          type="submit"
          class="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Iniciar Sesión
        </button>
      </form>

      <!-- Enlace para crear cuenta -->
      <p class="mt-6 text-center text-gray-600">
        ¿No tienes una cuenta?
        <router-link to="/register" class="text-blue-600 hover:text-blue-700 font-semibold">Crear cuenta</router-link>
      </p>
    </div>
  </div>
</template>
