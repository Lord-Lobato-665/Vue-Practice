import { defineStore } from 'pinia'
import axios from 'axios'

// En el store de comentarios
export const useCommentStore = defineStore('commentStore', {
  state: () => ({
    comments: [],
    userId: localStorage.getItem('userId') // Obtener userId del localStorage
  }),

  actions: {
    // Obtener comentarios del usuario
    async fetchComments() {
      try {
        const response = await axios.get(`http://localhost:3000/attack/xss?userId=${this.userId}`);
        if (response.data.results) {
          this.comments = response.data.results.filter(comment => comment.user_id == this.userId);
        }
      } catch (error) {
        console.error('Error al obtener los comentarios:', error);
      }
    },

    // Enviar nuevo comentario
    async postComment(commentText) {
      try {
        const response = await axios.post('http://localhost:3000/attack/xss', {
          user_id: this.userId,
          comment: commentText
        });

        if (response.status === 200) {
          await this.fetchComments();
        }
      } catch (error) {
        console.error('Error al enviar comentario:', error);
      }
    },

    // Limpiar comentarios y el userId cuando el usuario cierre sesión
    clearComments() {
      this.comments = [];
      this.userId = null;
      localStorage.removeItem('userId');
    },

    // Actualizar el userId en el store si es necesario
    updateUserId(newUserId) {
      this.userId = newUserId;
      localStorage.setItem('userId', newUserId);
    }
  }
});

