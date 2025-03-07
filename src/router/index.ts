import { createRouter, createWebHistory } from 'vue-router';
import Counter from '@/components/Counter.vue';
import ParentComponent from '@/components/ParentComponent.vue';
import PiniaComponent from '@/components/PiniaComponent.vue';
import Tailwind from '@/components/Tailwind.vue';
import NotesView from '@/views/NotesView.vue';
import NotFound from '@/views/NotFound.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import { useAuthStore } from '@/stores/authStore';
import SQLInjectionDemo from '@/components/SQLInjectionDemo.vue';

const routes = [
  { path: '/', redirect: '/login' }, // Redirige a Counter por defecto
  { path: '/counter', component: Counter },
  { path: '/parent', component: ParentComponent},
  { path: '/pinia', component: PiniaComponent },
  { path: '/tailwind', component: Tailwind},
  { path: '/notelist', component: NotesView },
  { path: '/slqinjection', component: SQLInjectionDemo },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
