<template>
  <div class="min-h-screen bg-[#202022] relative">
    <!-- Header with Home Button and Site Title -->
    <div class="absolute top-4 left-4 flex items-center space-x-3 z-10">
      <button
        @click="navigateToHome"
        class="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
        title="Go to Home"
      >
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      </button>
      <h1 class="text-white text-xl font-semibold">Portfolio</h1>
    </div>
    
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md">
        <!-- Main Login Card -->
      <div class="bg-white rounded-lg p-8 shadow-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-[#2f2f3f] mb-2">Welcome!</h2>
          <p class="text-gray-600 text-sm">Sign in to try my apps</p>
        </div>

        <!-- Success/Error Messages -->
        <div v-if="message && messageType === 'error'" class="mt-6 mb-6 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
          <p class="text-sm">{{ message }}</p>
        </div>

        <!-- Success Message for Email Sent -->
        <div v-if="showOtpInput" class="text-center mb-6">
          <h3 class="text-lg font-medium text-[#2f2f3f] mb-2">Check your email for a link</h3>
          <h3 class="text-md font-medium text-[#2f2f3f] mb-2">Have a verification code instead?</h3>
          <p class="text-gray-600 text-sm mb-4">
            Enter the code sent to<br>
            <span class="font-medium">{{ email }}</span>
          </p>
        </div>

        <!-- Email Form -->
        <form v-if="!showOtpInput" @submit.prevent="signInWithOtp" class="space-y-6">
          <div>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-[#2f2f3f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#234e70] focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            :disabled="!email || loading"
            class="w-full bg-[#234e70] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a3a54] focus:outline-none focus:ring-2 focus:ring-[#234e70] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ loading ? 'Sending email...' : 'Continue with email' }}</span>
          </button>
        </form>

        <!-- OTP Form -->
        <form v-if="showOtpInput" @submit.prevent="verifyOtp" class="space-y-6">
          <div>
            <input
              id="otp"
              v-model="otp"
              type="text"
              maxlength="6"
              pattern="[0-9]{6}"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-[#2f2f3f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#234e70] focus:border-transparent transition-all duration-200"
              placeholder="Enter verification code"
            />
          </div>

          <div class="space-y-3">
            <button
              type="submit"
              :disabled="!otp || otp.length !== 6 || otpLoading"
              class="w-full bg-[#234e70] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a3a54] focus:outline-none focus:ring-2 focus:ring-[#234e70] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg v-if="otpLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ otpLoading ? 'Verifying...' : 'Verify Email Address' }}</span>
            </button>
            
            <button
              type="button"
              @click="resetForm"
              class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200"
            >
              Back to Email
            </button>
          </div>
          
          <!-- Resend Email Link -->
          <div class="text-center mt-4">
            <p class="text-gray-500 text-sm">
              Not seeing the email in your inbox? 
              <button 
                @click="resendEmail" 
                class="text-[#234e70] hover:underline font-medium"
                :disabled="loading"
              >
                Try sending again
              </button>.
            </p>
          </div>
        </form>

        <!-- Divider -->
        <div v-if="!showOtpInput" class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">or continue with</span>
          </div>
        </div>

        <!-- Social Login Buttons -->
        <div v-if="!showOtpInput" class="space-y-3">
          <button
            @click="signInWithProvider('github')"
            class="w-full bg-white border-2 border-[#234e70] text-[#234e70] py-3 px-4 rounded-lg font-medium hover:bg-[#234e70] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#234e70] focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>Continue with GitHub</span>
          </button>

          <button
            @click="signInWithProvider('linkedin_oidc')"
            class="w-full bg-white border-2 border-[#234e70] text-[#234e70] py-3 px-4 rounded-lg font-medium hover:bg-[#234e70] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#234e70] focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>Continue with LinkedIn</span>
          </button>
        </div>
        
        <!-- Footer -->
        <p class="text-center text-gray-400 text-sm mt-8">
          
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const config = useRuntimeConfig()
const email = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const showOtpInput = ref(false)
const otp = ref('')
const otpLoading = ref(false)

const signInWithOtp = async () => {
  if (!email.value) return
  
  loading.value = true
  message.value = ''
  
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: `${config.public.baseUrl}/confirm`,
      }
    })
    
    if (error) {
      message.value = error.message
      messageType.value = 'error'
    } else {
      message.value = 'Check your email for the magic link!'
      messageType.value = 'success'
      showOtpInput.value = true
    }
  } catch (error) {
    message.value = 'An unexpected error occurred'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

const verifyOtp = async () => {
  if (!email.value || !otp.value) return
  
  otpLoading.value = true
  message.value = ''
  
  try {
    const { error } = await supabase.auth.verifyOtp({
      email: email.value,
      token: otp.value,
      type: 'magiclink'
    })
    
    if (error) {
      message.value = error.message
      messageType.value = 'error'
    } else {
      message.value = 'Successfully logged in!'
      messageType.value = 'success'
      // Redirect or navigate to dashboard
      await navigateTo('/')
    }
  } catch (error) {
    message.value = 'Invalid or expired OTP'
    messageType.value = 'error'
  } finally {
    otpLoading.value = false
  }
}

const resetForm = () => {
  email.value = ''
  otp.value = ''
  showOtpInput.value = false
  message.value = ''
}

const resendEmail = async () => {
  if (!email.value) return
  await signInWithOtp()
}

const signInWithProvider = async (provider: 'github' | 'linkedin_oidc') => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${config.public.baseUrl}/confirm`
      }
    })
    
    if (error) {
      message.value = error.message
      messageType.value = 'error'
    }
  } catch (error) {
    message.value = 'An unexpected error occurred'
    messageType.value = 'error'
  }
}

const navigateToHome = () => {
  navigateTo('/')
}
</script>