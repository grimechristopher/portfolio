<template>
  <div class="resume-page">
    <ResumeComponent />
  </div>
</template>

<script setup lang="ts">
import type { StrapiResponse } from '~/types/strapi'
import type { SeoContent } from '~/types/seo'

// Use the custom resume layout
definePageMeta({
  layout: 'resume'
})

const { findOne } = useStrapi()

// Fetch SEO data from Strapi to get OG fields
const seoResponse = await findOne('seo', '').catch(() => null) as StrapiResponse<SeoContent> | null
const seoData = seoResponse?.data

// SEO Meta tags for the resume page using Strapi OG fields
useSeoMeta({
  title: 'Resume', // This will be combined with site name by the global title template
  description: seoData?.ogDescription || 'Professional resume and experience of Christopher Grime - Full Stack Developer, Software Engineer',
  ogTitle: seoData?.ogTitle || 'Christopher Grime - Resume',
  ogDescription: seoData?.ogDescription || 'Professional resume and experience of Christopher Grime - Full Stack Developer, Software Engineer',
  ogUrl: `${seoData?.SiteUrl || 'https://christophergrime.com'}/resume`,
  ogType: 'profile',
  twitterCard: 'summary_large_image',
})

// Add structured data for better SEO using Strapi data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: seoData?.AuthorName || 'Christopher Grime',
        jobTitle: 'Full Stack Developer',
        url: seoData?.SiteUrl || 'https://christophergrime.com',
        sameAs: [
          'https://linkedin.com/in/christophergrime',
          'https://github.com/grimechristopher'
        ]
      })
    }
  ]
})
</script>

<style scoped>
.resume-page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

@media (max-width: 768px) {
  .resume-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>