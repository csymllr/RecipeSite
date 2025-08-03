import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  { path: '/', name: 'Home', component: () => import('../pages/HomePage.vue') },
  { path: '/login', name: 'Login', component: () => import('../pages/LoginPage.vue') },
  { path: '/recipes/new', name: 'ParseRecipe', component: () => import('../pages/ParseRecipePage.vue') },
  { path: '/recipes/manual-entry', name: 'ManualEntry', component: () => import('../pages/ManualEntryPage.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const isLogin = to.path === '/login';
  onAuthStateChanged(auth, (user) => {
    if (!user && !isLogin) {
      next('/login');
    } else if (user && isLogin) {
      next('/');
    } else {
      next();
    }
  });
});

export default router;
