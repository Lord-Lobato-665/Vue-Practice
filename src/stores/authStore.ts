import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useCommentStore } from '@/stores/commentStore';  // Importamos el store de comentarios
import type { UserCredentials, AuthResponse } from '@/Interfaces/Auth';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token') || null);
  const userId = ref<string | null>(localStorage.getItem('userId') || null);
  const userRole = ref<string | null>(localStorage.getItem('userRole') || null);
  const isAuthenticated = ref<boolean>(!!token.value);

  // Accedemos al store de comentarios
  const commentStore = useCommentStore();

  const login = async (credentials: UserCredentials) => {
    try {
      const { data }: { data: AuthResponse } = await axios.post('http://localhost:3000/users/login', credentials);

      // Guardar datos en las variables reactivas
      token.value = data.token;
      userId.value = String(data.id);
      userRole.value = data.role;

      // Guardar en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', String(data.id));
      localStorage.setItem('userRole', data.role);

      isAuthenticated.value = true;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (credentials: UserCredentials) => {
    try {
      await axios.post('http://localhost:3000/users/register', credentials);
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token.value) {
        await axios.post('http://localhost:3000/users/logout', { token: token.value });
      }

      // Limpiar los comentarios y el userId en el store de comentarios
      commentStore.clearComments();  // Limpiar comentarios cuando el usuario cierre sesión

      // Limpiar los datos en las variables reactivas y en localStorage
      token.value = null;
      userId.value = null;
      userRole.value = null;

      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');

      isAuthenticated.value = false;
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  };

  return { token, userId, userRole, isAuthenticated, login, register, logout };
});
