<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const lang = 'en-US';

useHead({
  title: 'Chris Grime', // Should update this to use api
  htmlAttrs: { lang },
  meta: [{ name: 'description', content: 'Welcome to my site!' }],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
});
</script>