<template>
  <div class="app-layout">
    <!-- Full viewport header / hero section -->
    <div class="above-fold">
      <!-- Resume button in top right corner -->
      <div class="resume-button-container" v-show="!isHeaderSticky">
        <NuxtLink to="/resume" class="resume-button">Resume</NuxtLink>
      </div>
      
      <section class="hero-section">
        <!-- Your business card container -->
        <div class="hero-content">
          <FlipCard />
        </div>
      </section>
      <!-- Header at bottom of the screen -->
      <header class="app-header" ref="header">
        <slot name="header" />
        <nav>
          <!-- Nav links on the left -->
          <div class="nav-links">
            <a href="/">Home</a>
          </div>
          <!-- Resume button appears in navbar when sticky (on the right) -->
          <NuxtLink 
            v-show="isHeaderSticky" 
            to="/resume" 
            class="resume-button navbar-resume-button">
            Resume
          </NuxtLink>
        </nav>
      </header>
    </div>

    
    <!-- Page content below hero and navigation -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const header = ref<HTMLElement>()
const isHeaderSticky = ref(false)

// Handle scroll behavior for header
const handleScroll = () => {
  if (!header.value) return
  
  const scrollY = window.scrollY
  const viewportHeight = window.innerHeight
  
  if (scrollY >= viewportHeight - header.value.offsetHeight) {
    header.value.classList.add('sticky-top')
    isHeaderSticky.value = true
  } else {
    header.value.classList.remove('sticky-top')
    isHeaderSticky.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
main {
  background-color: var(--bg);
}

.app-layout {
  min-height: 100vh;
}

.above-fold {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height */
  position: relative;
}

.resume-button-container {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 200;
}

.resume-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--cg-blue);
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.resume-button:hover {
  background: var(--cg-blue-hover);
  transform: translateY(-1px);
}

.hero-section {
  /* height: 100vh; */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--hero-bg); 

}

.hero-content {
  position: relative;
  z-index: 10;
  perspective: 100vw;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-header {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  flex-shrink: 0;
  background: var(--header-bg);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-color);
  transition: all 0.3s ease;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-header nav {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.navbar-resume-button {
  background: var(--cg-blue);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.navbar-resume-button:hover {
  background: var(--cg-blue-hover);
  transform: translateY(-1px);
}

.app-header nav a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.2s ease;
}

.app-header nav a:hover {
  color: var(--cg-blue-light);
}

.app-header.sticky-top {
  position: fixed;
  top: 0;
  bottom: auto;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.app-footer {
  margin-top: auto;
  padding: 1rem;
  background: var(--footer-bg, #f9fafb);
  border-top: 1px solid var(--border-color, #e5e7eb);
  text-align: center;
  color: var(--text-muted, #6b7280);
}


</style>