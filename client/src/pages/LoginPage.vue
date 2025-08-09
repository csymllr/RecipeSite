<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col">
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <h1 class="text-3xl font-bold text-center mb-6">Welcome to FamilyRecipe</h1>
    
          <!-- Login Form -->
          <form @submit.prevent="login" v-if="!showRegistration">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input v-model="email" type="email" placeholder="Email" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input v-model="password" type="password" placeholder="Password" class="input input-bordered" required />
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <div v-if="error" class="alert alert-error mt-4">
              <span>{{ error }}</span>
            </div>
          </form>
    
          <!-- Registration Form -->
          <form @submit.prevent="register" v-else>
            <h2 class="text-2xl font-bold text-center mb-2">Create Account</h2>
            <p class="text-center text-sm opacity-70 mb-6">Email not found. Let's create your account!</p>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input v-model="email" type="email" placeholder="Email" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input v-model="password" type="password" placeholder="Password (min 6 characters)" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Confirm Password</span>
              </label>
              <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="input input-bordered" required />
            </div>
            <div class="flex gap-2 mt-6">
              <button type="button" @click="backToLogin" class="btn btn-outline flex-1">Back to Login</button>
              <button type="submit" class="btn btn-success flex-1">Create Account</button>
            </div>
            <div v-if="registrationError" class="alert alert-error mt-4">
              <span>{{ registrationError }}</span>
            </div>
          </form>
        </div>

        <!-- Social Login -->
        <div v-if="!showRegistration" class="card-body pt-0">
          <div class="divider">Or continue with</div>
      <div class="flex flex-col gap-3">
        <button type="button" class="btn btn-outline btn-block" @click="loginWithGoogle">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <button type="button" class="btn btn-outline btn-block" @click="loginWithFacebook">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Continue with Facebook
        </button>
        
        <button type="button" class="btn btn-outline btn-block" @click="showPhoneDialog = true">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          Continue with Phone
        </button>
      </div>
    </div>
      </div>
    </div>
  </div>

  <!-- Phone Auth Dialog -->
  <div v-if="showPhoneDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle absolute right-2 top-2" @click="closePhoneDialog">✕</button>
      <h2 class="font-bold text-lg mb-4">Phone Authentication</h2>
      <form @submit.prevent="sendCode" v-if="!codeSent">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Phone Number</span>
          </label>
          <div class="join w-full">
            <!-- Country Dropdown -->
            <div class="dropdown">
              <div tabindex="0" role="button" class="btn btn-outline rounded-r-none join-item">
                {{ selectedCountry.flag }} {{ selectedCountry.code }}
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                </svg>
              </div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64 max-h-60 overflow-y-auto">
                <li v-for="country in countries" :key="country.code">
                  <a @click="selectCountry(country)" class="text-sm">
                    {{ country.flag }} {{ country.name }} ({{ country.code }})
                  </a>
                </li>
              </ul>
            </div>
            
            <!-- Phone Input -->
            <input 
              v-model="phoneNumber" 
              @input="formatPhoneNumber"
              type="tel" 
              :placeholder="selectedCountry.example"
              class="input input-bordered join-item flex-1" 
              required 
            />
          </div>
          <div class="text-xs opacity-70 mt-1">Enter your phone number without the country code</div>
        </div>
        <div id="recaptcha-container" class="mb-4"></div>
        <button type="submit" class="btn btn-primary w-full">Send Code</button>
      </form>
      <form @submit.prevent="verifyCode" v-else class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Verification Code</span>
          </label>
          <input 
            v-model="verificationCode" 
            type="text" 
            placeholder="Enter verification code" 
            class="input input-bordered" 
            required 
          />
        </div>
        <button type="submit" class="btn btn-success w-full">Verify</button>
      </form>
      <div v-if="phoneError" class="alert alert-error mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ phoneError }}</span>
      </div>
    </div>
  </div>
</template><script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

// Registration State
const showRegistration = ref(false);
const confirmPassword = ref('');
const registrationError = ref('');

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
    console.log('Login error:', e.code, e.message);
    
    // Check if user doesn't exist - redirect to registration
    if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
      showRegistration.value = true;
      error.value = '';
    } else if (e.code === 'auth/wrong-password') {
      error.value = 'Incorrect password. Please try again.';
    } else if (e.code === 'auth/invalid-email') {
      error.value = 'Please enter a valid email address.';
    } else {
      error.value = 'Login failed. Please check your credentials.';
    }
  }
};

const register = async () => {
  registrationError.value = '';
  
  // Validate passwords match
  if (password.value !== confirmPassword.value) {
    registrationError.value = 'Passwords do not match.';
    return;
  }
  
  // Validate password strength
  if (password.value.length < 6) {
    registrationError.value = 'Password must be at least 6 characters long.';
    return;
  }
  
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push('/');
  } catch (e) {
    console.log('Registration error:', e.code, e.message);
    
    if (e.code === 'auth/email-already-in-use') {
      registrationError.value = 'This email is already registered. Please try logging in.';
    } else if (e.code === 'auth/weak-password') {
      registrationError.value = 'Password is too weak. Please choose a stronger password.';
    } else if (e.code === 'auth/invalid-email') {
      registrationError.value = 'Please enter a valid email address.';
    } else {
      registrationError.value = 'Registration failed. Please try again.';
    }
  }
};

const backToLogin = () => {
  showRegistration.value = false;
  confirmPassword.value = '';
  registrationError.value = '';
  error.value = '';
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
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: (response) => {
          console.log('reCAPTCHA solved:', response);
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      });
      
      // Render the reCAPTCHA
      try {
        await window.recaptchaVerifier.render();
        console.log('reCAPTCHA rendered successfully');
      } catch (renderError) {
        console.error('reCAPTCHA render error:', renderError);
        throw new Error('Failed to load reCAPTCHA');
      }
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
/* All styles now handled by DaisyUI components with autumn theme */
</style>
