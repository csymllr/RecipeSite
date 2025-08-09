<template>
  <div class="login-container">
    <h1>Welcome to FamilyRecipe</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <div class="social-login">
      <button type="button" class="google-btn" @click="loginWithGoogle">Login with Google</button>
      <button type="button" class="facebook-btn" @click="loginWithFacebook">Login with Facebook</button>
      <button type="button" class="phone-btn" @click="showPhoneDialog = true">Login with Phone</button>
    </div>

    <!-- Phone Auth Dialog -->
    <div v-if="showPhoneDialog" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <button class="absolute top-2 right-2 text-gray-500" @click="closePhoneDialog">&times;</button>
        <h2 class="text-lg font-bold mb-4">Phone Authentication</h2>
        <form @submit.prevent="sendCode" v-if="!codeSent">
          <input v-model="phoneNumber" type="tel" placeholder="Enter phone number" class="w-full mb-3 px-3 py-2 border rounded" required />
          <div id="recaptcha-container" class="mb-3"></div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Send Code</button>
        </form>
        <form @submit.prevent="verifyCode" v-else>
          <input v-model="verificationCode" type="text" placeholder="Enter verification code" class="w-full mb-3 px-3 py-2 border rounded" required />
          <button type="submit" class="w-full bg-green-600 text-white py-2 rounded">Verify</button>
        </form>
        <p v-if="phoneError" class="text-red-600 mt-2">{{ phoneError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

// Phone Auth State
const showPhoneDialog = ref(false);
const phoneNumber = ref('');
const verificationCode = ref('');
const phoneError = ref('');
const codeSent = ref(false);
let confirmationResult = null;

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

const closePhoneDialog = () => {
  showPhoneDialog.value = false;
  phoneNumber.value = '';
  verificationCode.value = '';
  phoneError.value = '';
  codeSent.value = false;
  confirmationResult = null;
};

const sendCode = async () => {
  phoneError.value = '';
  try {
    const auth = getAuth();
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'normal',
        callback: () => {},
      }, auth);
    }
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber.value, window.recaptchaVerifier);
    codeSent.value = true;
  } catch (e) {
    phoneError.value = 'Failed to send code. Check phone number.';
  }
};

const verifyCode = async () => {
  phoneError.value = '';
  try {
    await confirmationResult.confirm(verificationCode.value);
    closePhoneDialog();
    router.push('/');
  } catch (e) {
    phoneError.value = 'Invalid verification code.';
  }
};

const loginWithGoogle = async () => {
  error.value = '';
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push('/');
  } catch (e) {
    error.value = 'Google login failed.';
  }
};

const loginWithFacebook = async () => {
  error.value = '';
  try {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
    router.push('/');
  } catch (e) {
    error.value = 'Facebook login failed.';
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

.social-login {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.google-btn {
  background: #4285F4;
  color: #fff;
  font-weight: bold;
}
.facebook-btn {
  background: #3b5998;
  color: #fff;
  font-weight: bold;
.phone-btn {
  background: #10b981;
  color: #fff;
  font-weight: bold;
}
}
</style>
