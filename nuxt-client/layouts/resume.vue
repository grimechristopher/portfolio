<template>
  <div class="resume-layout">
    <!-- Simple header with navigation -->
    <header class="resume-header">
      <nav class="resume-nav">
        <!-- Nav links on the left -->
        <div class="nav-links">
          <button @click="handleNavigation" class="nav-link">
            {{ navigationText }}
          </button>
        </div>
        <!-- Resume indicator on the right -->
        <div class="nav-title">
          Resume
        </div>
      </nav>
    </header>

    <!-- Page content -->
    <main class="resume-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const canGoBack = ref(false)

// Check if we can go back in history on mount
onMounted(() => {
  // Check if there's meaningful history to go back to
  // We consider it meaningful if:
  // 1. There's more than 1 entry in history
  // 2. The referrer is from the same origin (internal navigation) OR no referrer (typed URL/bookmark)
  const hasHistory = window.history.length > 1
  const referrer = document.referrer
  
  if (!hasHistory) {
    // No history, definitely go home
    canGoBack.value = false
  } else if (!referrer) {
    // No referrer (direct access/bookmark), but has history - could be back button worthy
    // In this case, we'll default to "Home" to be safe
    canGoBack.value = false
  } else {
    // Has referrer - check if it's from same origin
    try {
      const referrerOrigin = new URL(referrer).origin
      const currentOrigin = window.location.origin
      canGoBack.value = referrerOrigin === currentOrigin
    } catch {
      // Invalid referrer URL, default to home
      canGoBack.value = false
    }
  }
})

// Computed text for the navigation button
const navigationText = computed(() => {
  return canGoBack.value ? '← Back' : '← Home'
})

// Handle navigation logic
const handleNavigation = () => {
  if (canGoBack.value) {
    // Go back in history
    try {
      window.history.back()
      
      // Fallback: if back doesn't work after a short delay, go home
      setTimeout(() => {
        // Check if we're still on the same page (back didn't work)
        if (window.location.pathname === '/resume') {
          navigateTo('/')
        }
      }, 100)
    } catch {
      // If back fails, go home
      navigateTo('/')
    }
  } else {
    // Navigate to home
    navigateTo('/')
  }
}
</script>

<style scoped>
.resume-layout {
  height: 100vh;
  background: #000;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.resume-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.resume-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 100%;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  font-family: inherit;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.nav-title {
  font-weight: 600;
  font-size: 18px;
  color: var(--cg-blue, #3b82f6);
}

.resume-main {
  flex: 1;
  overflow: hidden;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .resume-nav {
    padding: 1rem;
  }
  
  .nav-link {
    font-size: 14px;
    padding: 6px 12px;
  }
  
  .nav-title {
    font-size: 16px;
  }
}
</style>
