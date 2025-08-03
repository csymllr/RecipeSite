import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: () => import('../pages/HomePage.vue') },
  { path: '/login', name: 'Login', component: () => import('../pages/LoginPage.vue') },
  { path: '/recipes/new', name: 'ParseRecipe', component: () => import('../pages/ParseRecipePage.vue') },
  { path: '/recipes/manual-entry', name: 'ManualEntry', component: () => import('../pages/ManualEntryPage.vue') }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
