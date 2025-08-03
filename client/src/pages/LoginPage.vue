<template>
  <div class="login-container">
    <h1>Welcome to FamilyRecipe</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  error.value = '';
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/');
  } catch (e) {
    error.value = 'Login failed. Please check your credentials.';
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: #fff;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 12px 0;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.error {
  color: #d32f2f;
  margin-top: 10px;
}
</style>
