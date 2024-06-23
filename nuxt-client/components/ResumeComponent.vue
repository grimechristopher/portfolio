<template>
    <button 
        class="resume-button" 
        :class="{'bg-light': props.bgShade === 'light'}"
        @click="openResumeModal()"
    >Resume
    </button>
    <ResumeModal 
        v-if="showModal" 
        @closeResumeModal="closeResumeModal()"
    />
</template>
<script setup>
import { ref, } from 'vue'
import { useRouter } from 'vue-router'

import ResumeModal from './ResumeModal.vue'

const showModal = ref(false);
const router = useRouter();
const props = defineProps(['bgShade'])

function openResumeModal() {
    // Add a hash to the URL to allow for direct linking to the modal
    router.push({ hash: '#resume', params: { savePosition: true }  });
    showModal.value = true;
}

function closeResumeModal() {
    router.push({ hash: '#' }); // Dont scroll back to top
    showModal.value = false;
}

// router.afterEach(() => {
//     if (router.currentRoute.value.hash !== '#resume') {
//         showModal.value = false;
//     } 
// });

watch(router.currentRoute, (to, from) => {
    if (to.hash === '#resume') {
        showModal.value = true;
        openResumeModal();
    } else {
        showModal.value = false;
    }
});
    
</script>
<style scoped>
.resume-button {
    position: relative;
    z-index: 1;
    margin: 0.33em;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: var(--bg);
    /* background-color: var(--cg-blue); */
    border: 2px solid var(--cg-blue);
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
}

.resume-button.bg-light {
    color: var(--cg-blue);
    background-color: transparent;
}

.resume-button.bg-light:hover {
    color: #ffffff;
}

.resume-button:hover {
    background-color: var(--cg-blue);
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.3);
    /* transform: translateY(-7px); */
}
</style>