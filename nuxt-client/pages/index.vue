<template>
  <div class="about-page">  
    <div v-if="aboutSections?.length" class="about-sections">
      <section 
        v-for="(section, index) in aboutSections" 
        :key="index" 
        class="about-section"
      >
        <h1>{{ section.Title }}</h1>
        <div class="prose">
          <MDC :value="section.Content" />
        </div>
      </section>
    </div>
    
    <div v-else class="no-content">
      <p>No about sections found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StrapiResponse, AboutContent } from '~/types/strapi'

const { find } = useStrapi()

// Fetch about data from Strapi
const aboutResponse = await find('about', {
  populate: '*'
}).catch(() => null) as StrapiResponse<AboutContent> | null;

const about = aboutResponse?.data;

console.log("About:", about);

// Get AboutSections from the about document
const aboutSections = about?.AboutSections || [];

console.log("About sections:", aboutSections);

// Process external links after the content is mounted
onMounted(() => {
  const processExternalLinks = () => {
    console.log('Processing external links in index page...')
    const links = document.querySelectorAll('.prose a[href^="http"], .content a[href^="http"]')
    
    links.forEach((link) => {
      const anchor = link as HTMLAnchorElement
      const href = anchor.href
      
      try {
        const linkUrl = new URL(href)
        const currentHost = window.location.hostname
        
        const isExternal = linkUrl.hostname !== currentHost &&
          linkUrl.hostname !== 'localhost' &&
          linkUrl.hostname !== '127.0.0.1'
        
        if (isExternal) {
          console.log(`Setting external attributes for: ${href}`)
          anchor.setAttribute('target', '_blank')
          anchor.setAttribute('rel', 'noopener noreferrer')
          
          if (!anchor.textContent?.includes('↗')) {
            anchor.innerHTML = anchor.innerHTML + ' <span style="opacity: 0.7; font-size: 0.8em;">↗</span>'
          }
        }
      } catch (error) {
        console.log(`Error processing link ${href}:`, error)
      }
    })
  }

  // Run immediately and after short delays
  nextTick(() => {
    processExternalLinks()
    setTimeout(processExternalLinks, 100)
    setTimeout(processExternalLinks, 500)
    setTimeout(processExternalLinks, 1000)
  })
})

// SEO
useSeoMeta({
  title: 'About Me',
  description: 'Learn more about me and my background'
})
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
}

.about-page h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  /* text-align: center; */
  color: #333;
}

.about-section {
  margin-bottom: 3rem;
}

.about-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #444;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

.no-content {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #888;
}

/* Responsive design */
@media (max-width: 768px) {
  .about-page {
    padding: 1rem;
  }
  
  .about-page h1 {
    font-size: 2rem;
  }
  
  .about-section h2 {
    font-size: 1.5rem;
  }
}
</style>