<template>
  <a 
    :href="href" 
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :class="{ 'external-link': isExternal }"
  >
    <slot />
    <span v-if="isExternal && showIcon" class="external-link-icon">↗</span>
  </a>
</template>

<script setup lang="ts">
interface Props {
  href: string
  showIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true
})

const isExternal = computed(() => {
  if (!props.href || process.server) return false
  
  return props.href.startsWith('http') && 
    !props.href.includes(window.location.hostname) &&
    !props.href.includes('localhost') &&
    !props.href.includes('127.0.0.1')
})
</script>

<style scoped>
.external-link-icon {
  font-size: 0.8em;
  margin-left: 0.2em;
  opacity: 0.7;
}

.external-link:hover .external-link-icon {
  opacity: 1;
}
</style>
