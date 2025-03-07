<script setup lang="ts">
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const successMessage = ref('');
const errorMessage = ref('');

// Reglas de validación
const rules = {
  email: { required, email },
  password: {
    required,
    minLength: minLength(8),
    containsUppercase: helpers.withMessage(
      'La contraseña debe contener al menos una letra mayúscula',
      (value: string) => /[A-Z]/.test(value)
    ),
    containsLowercase: helpers.withMessage(
      'La contraseña debe contener al menos una letra minúscula',
      (value: string) => /[a-z]/.test(value)
    ),
    containsNumber: helpers.withMessage(
      'La contraseña debe contener al menos un número',
      (value: string) => /[0-9]/.test(value)
    ),
    containsSpecial: helpers.withMessage(
      'La contraseña debe contener al menos un carácter especial',
      (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value)
    ),
  },
};

const v$ = useVuelidate(rules, { email, password });

const handleRegister = async () => {
  // Validar el formulario
  const isValid = await v$.value.$validate();

  if (!isValid) {
    errorMessage.value = 'Por favor, corrige los errores en el formulario.';
    return;
  }

  try {
    await authStore.register({ email: email.value, password: password.value });
    successMessage.value = 'Registro exitoso. Ahora puedes iniciar sesión.';
    email.value = '';
    password.value = '';
    errorMessage.value = '';
    v$.value.$reset(); // Reiniciar las validaciones
  } catch (error) {
    errorMessage.value = 'Error en el registro. Inténtalo de nuevo.';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-600">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Crear Cuenta</h2>

      <!-- Formulario de Registro -->
      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- Campo de correo electrónico -->
        <div class="mb-4">
          <label class="block text-gray-700">Correo Electrónico</label>
          <input
            v-model="email"
            type="email"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ingresa tu contraseña"
          />
          <p v-if="v$.password.$error" class="text-red-500 text-sm mt-1">
            <span v-for="error in v$.password.$errors" :key="error.$uid">
              {{ error.$message }}<br />
            </span>
          </p>
        </div>

        <!-- Mensajes de éxito y error -->
        <p v-if="successMessage" class="text-green-500 text-center">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>

        <!-- Botón de registro -->
        <button
          type="submit"
          class="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Registrarse
        </button>
      </form>

      <!-- Enlace para iniciar sesión -->
      <p class="mt-6 text-center text-gray-600">
        ¿Ya tienes una cuenta?
        <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-semibold">Iniciar sesión</router-link>
      </p>
    </div>
  </div>
</template>
