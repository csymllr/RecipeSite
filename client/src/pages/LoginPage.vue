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
      <div class="social-login-header">
        <span class="divider-line"></span>
        <span class="divider-text">Or continue with</span>
        <span class="divider-line"></span>
      </div>
      <div class="social-buttons">
        <button type="button" class="social-btn google-btn" @click="loginWithGoogle">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        
        <button type="button" class="social-btn facebook-btn" @click="loginWithFacebook">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
        
        <button type="button" class="social-btn phone-btn" @click="showPhoneDialog = true">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          Phone
        </button>
      </div>
    </div>

    <!-- Phone Auth Dialog -->
    <div v-if="showPhoneDialog" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <button class="absolute top-2 right-2 text-gray-500" @click="closePhoneDialog">&times;</button>
        <h2 class="text-lg font-bold mb-4">Phone Authentication</h2>
        <form @submit.prevent="sendCode" v-if="!codeSent">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div class="flex">
              <!-- Country Dropdown -->
              <div class="relative">
                <button 
                  @click="showCountryDropdown = !showCountryDropdown"
                  type="button" 
                  class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                >
                  {{ selectedCountry.flag }} {{ selectedCountry.code }}
                  <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div v-if="showCountryDropdown" class="absolute top-full left-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto">
                  <ul class="py-2 text-sm text-gray-700">
                    <li v-for="country in countries" :key="country.code">
                      <button 
                        @click="selectCountry(country)"
                        type="button" 
                        class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <span class="inline-flex items-center">
                          {{ country.flag }} {{ country.name }} ({{ country.code }})
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <!-- Phone Input -->
              <input 
                v-model="phoneNumber" 
                @input="formatPhoneNumber"
                type="tel" 
                :placeholder="selectedCountry.example"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </div>
            <div class="text-xs text-gray-500 mt-1">Enter your phone number without the country code</div>
          </div>
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
const showCountryDropdown = ref(false);
let confirmationResult = null;

// Country codes for phone authentication
const countries = ref([
  { name: 'United States', code: '+1', flag: '🇺🇸', example: '(555) 123-4567', pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}' },
  { name: 'Canada', code: '+1', flag: '🇨🇦', example: '(555) 123-4567', pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧', example: '7911 123456', pattern: '[0-9]{4} [0-9]{6}' },
  { name: 'Australia', code: '+61', flag: '🇦🇺', example: '412 345 678', pattern: '[0-9]{3} [0-9]{3} [0-9]{3}' },
  { name: 'Germany', code: '+49', flag: '🇩🇪', example: '151 12345678', pattern: '[0-9]{3} [0-9]{8}' },
  { name: 'France', code: '+33', flag: '🇫🇷', example: '6 12 34 56 78', pattern: '[0-9] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}' },
  { name: 'Japan', code: '+81', flag: '🇯🇵', example: '90 1234 5678', pattern: '[0-9]{2} [0-9]{4} [0-9]{4}' },
  { name: 'India', code: '+91', flag: '🇮🇳', example: '81234 56789', pattern: '[0-9]{5} [0-9]{5}' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷', example: '11 91234-5678', pattern: '[0-9]{2} [0-9]{5}-[0-9]{4}' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽', example: '55 1234 5678', pattern: '[0-9]{2} [0-9]{4} [0-9]{4}' }
]);


const selectedCountry = ref(countries.value[0]); // Default to US

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
  showCountryDropdown.value = false;
  confirmationResult = null;
  
  // Clean up recaptcha
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
    window.recaptchaVerifier = null;
  }
};

const selectCountry = (country) => {
  selectedCountry.value = country;
  showCountryDropdown.value = false;
  phoneNumber.value = ''; // Clear phone number when country changes
};

const formatPhoneNumber = () => {
  // Auto-format phone number based on country pattern
  const digits = phoneNumber.value.replace(/\D/g, '');
  
  if (selectedCountry.value.code === '+1') {
    // US/Canada format: (555) 123-4567
    if (digits.length >= 6) {
      phoneNumber.value = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    } else if (digits.length >= 3) {
      phoneNumber.value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      phoneNumber.value = digits;
    }
  } else {
    // For other countries, just preserve digits with spaces
    phoneNumber.value = digits.replace(/(\d{3})/g, '$1 ').trim();
  }
};

const sendCode = async () => {
  phoneError.value = '';
  try {
    const auth = getAuth();
    
    // Debug: Log raw input
    console.log('Raw phone input:', phoneNumber.value);
    console.log('Selected country:', selectedCountry.value);
    
    // Format phone number properly for E.164
    let digits = phoneNumber.value.replace(/\D/g, ''); // Remove all non-digits
    console.log('Digits only:', digits);
    
    // Build E.164 format: +[country code][national number]
    let e164Number = selectedCountry.value.code + digits;
    console.log('E.164 formatted number:', e164Number);
    
    // Validate basic format
    if (e164Number.length < 10 || e164Number.length > 15) {
      throw new Error('Invalid phone number length');
    }
    
    if (!window.recaptchaVerifier) {
      console.log('Creating reCAPTCHA verifier...');
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'normal',
        callback: (response) => {
          console.log('reCAPTCHA solved:', response);
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      }, auth);
    }
    
    console.log('Sending verification code to:', e164Number);
    confirmationResult = await signInWithPhoneNumber(auth, e164Number, window.recaptchaVerifier);
    console.log('SMS sent successfully!');
    codeSent.value = true;
  } catch (e) {
    console.error('Phone auth error details:', {
      error: e,
      code: e.code,
      message: e.message,
      stack: e.stack
    });
    
    // More specific error messages
    if (e.code === 'auth/invalid-phone-number') {
      phoneError.value = 'Invalid phone number format. Please check your number.';
    } else if (e.code === 'auth/too-many-requests') {
      phoneError.value = 'Too many attempts. Please try again later.';
    } else if (e.code === 'auth/captcha-check-failed') {
      phoneError.value = 'reCAPTCHA verification failed. Please try again.';
    } else {
      phoneError.value = `Error: ${e.message || 'Failed to send code. Please try again.'}`;
    }
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
}

.social-login-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  text-align: center;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #e5e7eb;
}

.divider-text {
  margin: 0 16px;
  color: #6b7280;
  font-size: 14px;
  white-space: nowrap;
}

.social-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 100px;
}

.social-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.google-btn:hover {
  border-color: #4285F4;
}

.facebook-btn {
  color: #1877f2;
}

.facebook-btn:hover {
  border-color: #1877f2;
}

.phone-btn {
  color: #10b981;
}

.phone-btn:hover {
  border-color: #10b981;
}
</style>
