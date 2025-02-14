import { createRouter, createWebHistory } from 'vue-router';
import Counter from '@/components/Counter.vue';
import ParentComponent from '@/components/ParentComponent.vue';
import PiniaComponent from '@/components/PiniaComponent.vue';
import Tailwind from '@/components/Tailwind.vue';
import NotesView from '@/views/NotesView.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', redirect: '/counter' }, // Redirige a Counter por defecto
  { path: '/counter', component: Counter },
  { path: '/parent', component: ParentComponent},
  { path: '/pinia', component: PiniaComponent },
  { path: '/tailwind', component: Tailwind},
  { path: '/notelist', component: NotesView },
  // pathMatch nos permite usar una expresion que detecta una ruta que no existe y nos redirige al 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
