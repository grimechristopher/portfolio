<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead, useRoute } from '#imports'
import { useStrapi } from '~/composables/useStrapi'
import type { SeoContent } from '~/types/seo'
import type { StrapiResponse } from '~/types/strapi'

const route = useRoute()
const { find } = useStrapi()

// Fetch global SEO data from Strapi (single type GlobalSeo)
const seoResponse = await find('Seo').catch(() => null) as StrapiResponse<SeoContent> | null;
const seo = seoResponse?.data as SeoContent;
console.log("SEO data:", seo);
useHead(() => {
  if (!seo) return undefined
  return {
    title: route.path === '/' ? seo.SiteName : (route.meta.title ? `${route.meta.title} | ${seo.SiteName}` : seo.SiteName),
    titleTemplate: (titleChunk?: string) => {
      if (!titleChunk || titleChunk === seo.SiteName) return seo.SiteName
      return `${titleChunk} | ${seo.SiteName}`
    },
    meta: [
      { name: 'description', content: seo.SiteDescription },
      { name: 'keywords', content: seo.DefaultKeywords },
      { name: 'author', content: seo.AuthorName },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' },
    ],
    htmlAttrs: {
      lang: 'en',
    },
  }
})
</script>
