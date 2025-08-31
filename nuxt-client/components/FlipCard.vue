<template>
    <div id="container-card" ref="containerCard" :style="containerStyle" @pointerleave="resetRotation"
        @pointermove="handlePointerMove" @click="flipCard">
        <div id="card-front" class="card" :style="frontStyle">
            <FlipCardFront :globalData="global" />
        </div>
        <div id="card-back" class="card" :style="backStyle">
            <FlipCardBack :globalData="global" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { StrapiResponse, GlobalContent } from '~/types/strapi'

// Configuration
const MAX_ROTATION = 20
const MOBILE_BREAKPOINT = 640
const THROTTLE_MS = 8 // ~120fps

// Strapi data fetching
// const config = useRuntimeConfig();
const { find } = useStrapi();

// Fetch global data from Strapi 5
const globalResponse = await find('global', {
    populate: '*'
}).catch(() => null) as StrapiResponse<GlobalContent> | null;

console.log("Global response:", globalResponse);

const global = globalResponse?.data;

// Reactive state
const rotateX = ref(0)
const rotateY = ref(0)
const flipCount = ref(0)
const windowWidth = ref(0)
const containerCard = ref<HTMLElement>()

// Throttling
let lastThrottleTime = 0

// Computed styles using Vue's reactivity
const containerStyle = computed(() => ({
    '--rotateX': rotateX.value,
    '--rotateY': rotateY.value,
    transform: `rotateX(calc(var(--rotateX) * 1deg)) rotateY(calc(var(--rotateY) * 1deg))`,
    transition: rotateX.value === 0 && rotateY.value === 0 ? 'transform 0.3s 0.3s' : 'none'
}))

const frontStyle = computed(() => ({
    transform: `rotateY(${flipCount.value * 180}deg)`,
    transition: 'transform 0.5s',
}))

const backStyle = computed(() => ({
    transform: `rotateY(${flipCount.value * 180 + 180}deg)`,
    transition: 'transform 0.5s',
}))

const isMobile = computed(() => windowWidth.value <= MOBILE_BREAKPOINT)

function handlePointerMove(event: PointerEvent) {
    // Skip mobile mouseover (when pointer isn't primary)
    if (isMobile.value && event.pointerType === 'mouse') return

    // Throttle for performance
    const now = performance.now()
    if (now - lastThrottleTime < THROTTLE_MS) return
    lastThrottleTime = now

    const { clientX, clientY } = event

    if (isMobile.value) {
        // Mobile: Y-axis rotation based on touch position relative to card
        const cardRect = containerCard.value?.getBoundingClientRect()
        if (!cardRect) return

        const cardCenterX = cardRect.left + cardRect.width / 2
        const normalizedX = (clientX - cardCenterX) / (cardRect.width / 2)
        rotateY.value = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, normalizedX * MAX_ROTATION))
        rotateX.value = 0
    } else {
        // Desktop: full 3D rotation based on window position
        const halfWidth = windowWidth.value / 2
        const halfHeight = window.innerHeight / 2

        const normalizedX = (clientX - halfWidth) / halfWidth
        const normalizedY = (clientY - halfHeight) / halfHeight

        rotateY.value = normalizedX * MAX_ROTATION
        rotateX.value = -normalizedY * MAX_ROTATION
    }
}

function resetRotation() {
    rotateX.value = 0
    rotateY.value = 0
}

function flipCard(event: MouseEvent) {
    // Determine flip direction based on click position
    const halfWidth = windowWidth.value / 2
    flipCount.value += event.clientX > halfWidth ? 1 : -1
}

function updateWindowWidth() {
    windowWidth.value = window.innerWidth
}

onMounted(() => {
    window.addEventListener('resize', updateWindowWidth)
    updateWindowWidth()

    // Demo flips to show interactivity
    setTimeout(() => flipCard(new MouseEvent('click', { clientX: windowWidth.value / 2 + 1 })), 100)
    setTimeout(() => flipCard(new MouseEvent('click', { clientX: windowWidth.value / 2 - 1 })), 600)
})
</script>

<style scoped>
#container-card {
    width: 35em;
    height: 20em;
    position: relative;
    z-index: 10;
    /* transform-style: preserve-3d; */
    
    --rotateX: 0;
    --rotateY: 0;
    transform: rotateX(calc(var(--rotateX) * 1deg)) rotateY(calc(var(--rotateY) * 1deg));
}

.card {
    width: inherit;
    height: inherit;
    border-radius: 0.25rem;
    position: absolute;
    backface-visibility: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0), 0 6px 20px 0 rgba(0, 0, 0);
}

#card-front {
    background: linear-gradient(145deg, #f9f9f9, #eaeaea);
}

#card-back {
    background: linear-gradient(145deg, #f9f9f9, #eaeaea);
}

@media (max-width: 640px) {
    #container-card {
        width: 20em;
        height: 35em;
    }
}
</style>