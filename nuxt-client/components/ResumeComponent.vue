<template>
  <div class="resume-container">
    <!-- Loading spinner -->
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading Resume...</p>
    </div>
    
    <!-- Error message if no resume link -->
    <div v-else-if="!global?.ResumeLink" class="error-message">
      <h2>Resume Not Available</h2>
      <p>Sorry, the resume could not be loaded at this time.</p>
      <NuxtLink to="/" class="back-link">← Return Home</NuxtLink>
    </div>
    
    <!-- Iframe for visual display -->
    <iframe
      v-if="global?.ResumeLink"
      :src="global.ResumeLink"
      class="resume-iframe"
      :class="{ 'iframe-hidden': isLoading }"
      title="Resume"
      @load="onIframeLoad"
      @error="onIframeError"
    ></iframe>
    
    <!-- SEO-optimized semantic content (screen reader accessible) -->
    <div class="sr-only" v-if="resumeData">
      <article itemscope itemtype="https://schema.org/Person">
        <!-- Basic Info -->
        <header>
          <h1 itemprop="name">{{ resumeData.basics?.name }}</h1>
          <p itemprop="jobTitle">{{ resumeData.basics?.headline }}</p>
          <p itemprop="address">{{ resumeData.basics?.location }}</p>
          <a v-if="resumeData.basics?.email" itemprop="email" :href="`mailto:${resumeData.basics.email}`">{{ resumeData.basics.email }}</a>
          <a v-if="resumeData.basics?.url?.href" itemprop="url" :href="resumeData.basics.url.href">{{ resumeData.basics.url.label }}</a>
        </header>

        <!-- Professional Summary -->
        <section v-if="resumeData.sections?.summary?.visible">
          <h2>{{ resumeData.sections.summary.name }}</h2>
          <div v-html="decodeHtml(resumeData.sections.summary.content)"></div>
        </section>

        <!-- Experience -->
        <section v-if="resumeData.sections?.experience?.visible && resumeData.sections.experience.items?.length">
          <h2>{{ resumeData.sections.experience.name }}</h2>
          <div v-for="job in resumeData.sections.experience.items" :key="job.id" 
               v-show="job.visible" 
               itemprop="worksFor" 
               itemscope 
               itemtype="https://schema.org/Organization">
            <h3 itemprop="jobTitle">{{ job.position }}</h3>
            <p>
              <span itemprop="name">{{ job.company }}</span> - 
              <span itemprop="address">{{ job.location }}</span>
            </p>
            <time>{{ job.date }}</time>
            <div v-html="decodeHtml(job.summary)"></div>
          </div>
        </section>

        <!-- Education -->
        <section v-if="resumeData.sections?.education?.visible && resumeData.sections.education.items?.length">
          <h2>{{ resumeData.sections.education.name }}</h2>
          <div v-for="edu in resumeData.sections.education.items" :key="edu.id" 
               v-show="edu.visible"
               itemprop="alumniOf"
               itemscope
               itemtype="https://schema.org/EducationalOrganization">
            <h3 itemprop="name">{{ edu.institution }}</h3>
            <p itemprop="hasCredential">{{ edu.area }}</p>
            <time>{{ edu.date }}</time>
            <div v-html="decodeHtml(edu.summary)"></div>
          </div>
        </section>

        <!-- Additional Experience -->
        <section v-if="resumeData.sections?.volunteer?.visible && resumeData.sections.volunteer.items?.length">
          <h2>{{ resumeData.sections.volunteer.name }}</h2>
          <div v-for="vol in resumeData.sections.volunteer.items" :key="vol.id" v-show="vol.visible">
            <h3>{{ vol.position }}</h3>
            <p>{{ vol.organization }} - {{ vol.location }}</p>
            <time>{{ vol.date }}</time>
            <div v-html="decodeHtml(vol.summary)"></div>
          </div>
        </section>

        <!-- Social Profiles -->
        <section v-if="resumeData.sections?.profiles?.visible && resumeData.sections.profiles.items?.length">
          <h2>Professional Profiles</h2>
          <ul>
            <li v-for="profile in resumeData.sections.profiles.items" :key="profile.id" v-show="profile.visible">
              <a :href="profile.url.href" itemprop="sameAs">
                {{ profile.network }}: {{ profile.username }}
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { StrapiResponse, GlobalContent } from '~/types/strapi'

const { find } = useStrapi();

// Loading state
const isLoading = ref(true);

// Function to handle iframe load
const onIframeLoad = () => {
  isLoading.value = false;
};

// Function to handle iframe error
const onIframeError = () => {
  console.error('Resume iframe failed to load');
  isLoading.value = false;
};

// Add a timeout fallback in case iframe doesn't load
setTimeout(() => {
  if (isLoading.value) {
    console.warn('Resume iframe failed to load within 10 seconds');
    isLoading.value = false;
  }
}, 10000);

// Fetch global data from Strapi 5
const globalResponse = await find('global', {
  populate: '*'
}).catch(() => null) as StrapiResponse<GlobalContent> | null;

const global = globalResponse?.data;

// Watch for global data and update loading state accordingly
watchEffect(() => {
  if (global === undefined) {
    // Still loading from Strapi
    isLoading.value = true;
  } else if (!global?.ResumeLink) {
    // No resume link found
    console.warn('No resume link found in global data');
    isLoading.value = false;
  }
  // If we have a resume link, keep loading until iframe loads
});

// Parse resume JSON data
const resumeData = computed(() => {
  if (!global?.ResumeJson) return null;
  try {
    return typeof global.ResumeJson === 'string' 
      ? JSON.parse(global.ResumeJson) 
      : global.ResumeJson;
  } catch (error) {
    console.error('Error parsing resume JSON:', error);
    return null;
  }
});

// Decode HTML entities for proper display
const decodeHtml = (html: string) => {
  if (!html) return '';
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
};
</script>

<style scoped>
.resume-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  padding-top: 80px; /* Account for fixed header */
  overflow: hidden;
}

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 2rem;
  text-align: center;
}

.error-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  z-index: 1001;
  padding: 2rem;
  max-width: 90%;
}

.error-message h2 {
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.error-message p {
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
}

.back-link {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
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
  height: calc(100vh - 80px);
  border: none;
  transition: opacity 0.3s ease;
  min-height: 0;
  flex: 1;
}

.iframe-hidden {
  opacity: 0;
}

/* Screen reader only content - SEO accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .resume-container {
    padding-top: 70px; /* Account for smaller mobile header */
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .resume-iframe {
    height: calc(100vh - 70px);
    width: 100vw;
  }
  
  .loading-spinner {
    padding: 1rem;
  }
  
  .loading-spinner p {
    font-size: 16px;
    margin-top: 15px;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border-width: 4px;
  }
  
  .error-message {
    padding: 1rem;
    max-width: 95%;
  }
  
  .error-message h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .error-message p {
    font-size: 14px;
    margin-bottom: 1.5rem;
  }
  
  .back-link {
    padding: 12px 24px;
    font-size: 16px;
    min-height: 44px; /* Touch-friendly size */
  }
}

/* Additional mobile fixes for iframe */
@media (max-width: 768px) {
  /* Prevent iframe zoom and scrolling issues */
  .resume-iframe {
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }
}

/* Fix for very small screens */
@media (max-width: 480px) {
  .resume-container {
    padding-top: 60px;
  }
  
  .resume-iframe {
    height: calc(100vh - 60px);
  }
  
  .loading-spinner {
    padding: 0.5rem;
  }
  
  .error-message {
    padding: 0.5rem;
    max-width: 98%;
  }
  
  .error-message h2 {
    font-size: 1.25rem;
  }
  
  .error-message p {
    font-size: 13px;
  }
}

/* Landscape orientation fixes */
@media (max-width: 768px) and (orientation: landscape) {
  .resume-container {
    padding-top: 60px;
  }
  
  .resume-iframe {
    height: calc(100vh - 60px);
  }
  
  .loading-spinner {
    padding: 0.5rem;
  }
  
  .loading-spinner p {
    font-size: 14px;
    margin-top: 10px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border-width: 3px;
  }
}
</style>