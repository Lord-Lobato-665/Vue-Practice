import { createRouter, createWebHistory } from 'vue-router';
import Counter from '@/components/Counter.vue';
import TodoList from '@/components/TodoList.vue';
import ParentComponent from '@/components/ParentComponent.vue';
import PiniaComponent from '@/components/PiniaComponent.vue';

const routes = [
  { path: '/', redirect: '/counter' }, // Redirige a Counter por defecto
  { path: '/counter', component: Counter },
  { path: '/todo', component: TodoList },
  { path: '/parent', component: ParentComponent},
  { path: '/pinia', component: PiniaComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
