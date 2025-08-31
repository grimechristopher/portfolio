<template> 
    <div class="resume-modal">
        <button class="close-button" @click="$emit('close')">✕</button>
        
        <!-- Loading spinner -->
        <div v-if="isLoading" class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading Resume...</p>
        </div>
        
        <iframe 
          :src="global?.ResumeLink" 
          class="resume-iframe"
          :class="{ 'iframe-hidden': isLoading }"
          title="Resume"
          @load="onIframeLoad"
        ></iframe>
    </div>
Resume
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { StrapiResponse, GlobalContent } from '~/types/strapi'

const { find } = useStrapi();

// Loading state
const isLoading = ref(true);

// Function to handle iframe load
const onIframeLoad = () => {
  isLoading.value = false;
};

// Fetch global data from Strapi 5
const globalResponse = await find('global', {
    populate: '*'
}).catch(() => null) as StrapiResponse<GlobalContent> | null;

console.log("Global response:", globalResponse);

const global = globalResponse?.data;
</script>

<style scoped>
.resume-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 30px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 40px;
  color: white;
  cursor: pointer;
  z-index: 1001;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
  border-color: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.loading-spinner {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.loading-spinner p {
  color: white;
  font-size: 18px;
  margin-top: 20px;
  font-weight: 500;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top: 6px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.resume-iframe {
  width: 100%;
  height: 100%;
  border: none;
  transition: opacity 0.3s ease;
}

.iframe-hidden {
  opacity: 0;
}
</style>