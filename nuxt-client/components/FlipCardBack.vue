<template>
 <div class="header-color-bar"></div>
<div class="container-back">
<div class="container-bullets">
<!-- Work Experience Section (Prominently displayed) -->
<div class="work-section" v-if="workExperience">
<div class="container-bullet work-bullet">
<div class="bullet-icon work-icon">
<client-only>
<font-awesome-icon :icon="getIconForExperienceType('Work')" />
</client-only>
</div>
<div class="bullet-text">
<h3 class="work-title">
<span v-if="workExperience.StartDate">{{calculateYears(workExperience.StartDate)}} years</span>
 {{ workExperience.Title }}
</h3>
<h4 class="work-location" v-if="workExperience.Location">{{ workExperience.Location }}</h4>
</div>
</div>
</div>

<!-- Education Section (Secondary) -->
<div class="education-section" v-if="educationExperiences.length > 0">
<div class="section-divider"></div>
<div class="container-bullet education-bullet" v-for="education in educationExperiences" :key="education.id">
<div class="bullet-icon education-icon">
<client-only>
<font-awesome-icon :icon="getIconForExperienceType('Education')" />
</client-only>
</div>
<div class="bullet-text">
<h3 class="education-title">{{ education.Title }}</h3>
<h4 class="education-location" v-if="education.Location">{{ education.Location }}</h4>
</div>
</div>
</div>
</div>
<div class="container-skills">
<div class="container-skill" v-for="skill in global?.Skills" :key="skill.id">
<svg role="img" :viewBox="skill.Viewbox" xmlns="http://www.w3.org/2000/svg">
<title>{{ skill.Title }}</title>
<path :fill="`#${skill.Color}`" :d="skill.Svg"/>
</svg>
</div>
</div>
</div>
<div class="footer-color-bar"></div>
</template>
<script setup lang="ts">
import type { GlobalContent } from '~/types/strapi'
// Accept global data as prop from parent
const props = defineProps<{
globalData?: GlobalContent
}>()
const global = props.globalData;

// Computed properties to separate work and education
const workExperience = computed(() => {
return global?.Experiences?.find(exp => exp.Type === 'Work')
})

const educationExperiences = computed(() => {
return global?.Experiences?.filter(exp => exp.Type === 'Education') || []
})

function calculateYears(date: string): string {
if (date) {
const now = Date.now();
const then = Date.parse(date);
const since = now - then;
const years = Math.floor(since / 1000 / 60 / 60 / 24 / 365.25);
return `${years}+ `;
 }
return '';
}
function getIconForExperienceType(type: 'Work' | 'Education'): string[] {
switch (type) {
case 'Work':
return ['fas', 'briefcase'];
case 'Education':
return ['fas', 'graduation-cap'];
default:
return ['fas', 'circle'];
 }
}
</script>
<style scoped>
.header-color-bar {
background-color: var(--cg-blue);
width: 100%;
height: 7.5%;
border-top-left-radius: 0.25rem;
border-top-right-radius: 0.25rem;
}
.footer-color-bar {
background-color: #234e70;
width: 100%;
height: 7.5%;
border-bottom-left-radius: 0.25rem;
border-bottom-right-radius: 0.25rem;
}
.container-back {
display: flex;
flex-direction: column;
justify-content: space-around;
height: 85%;
}

/* Work Section Styling - Prominent */
.work-section {
margin-bottom: 1rem;
}

.work-bullet {
display: grid;
grid-template-columns: 1fr 6fr;
padding: 0.5rem 0;
}

.work-bullet .work-title {
margin: 0;
font-size: 0.95rem;
font-weight: 800;
color: var(--cg-blue, #234e70);
line-height: 1.2;
}

.work-bullet .work-location {
margin: 0;
font-weight: 400;
font-style: italic;
font-size: 0.9rem;
color: #333;
}

.work-icon {
display: flex;
justify-content: center;
height: 100%;
padding-top: 6%;
}

.work-icon svg {
color: var(--cg-blue, #234e70);
font-size: 1.1em;
}

/* Section Divider */
.section-divider {
height: 1px;
background: linear-gradient(to right, transparent, #ccc, transparent);
margin: 0.75rem 0;
}

/* Education Section Styling - Secondary */
.education-section {
opacity: 1;
}

.education-bullet {
display: grid;
grid-template-columns: 1fr 6fr;
padding: 0.25rem 0;
}

.education-bullet .education-title {
margin: 0;
font-size: 0.8rem;
font-weight: 600;
color: #333;
}

.education-bullet .education-location {
margin: 0;
font-weight: 300;
font-style: italic;
font-size: 0.75rem;
color: #555;
}

.education-icon {
display: flex;
justify-content: center;
height: 100%;
padding-top: 6%;
}

.education-icon svg {
color: #555;
font-size: 0.9em;
}

.container-skills {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 0.67rem;
justify-items: center;
padding: 0.67rem 1rem;
}
.container-skill {
width: 2.5rem;
height: 2.5rem;
}

@media (min-width: 640px) {
.header-color-bar {
display: none;
 }
.container-back {
display: flex;
flex-direction: row;
justify-content: space-between;
height: 92.5%;
 }
.container-bullets {
max-width: 55%;
display: flex;
flex-direction: column;
justify-content: center;
padding: 0.67rem;
 }
.container-skills {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 0.67rem;
justify-items: center;
align-content: center;
justify-self: center;
width: 100%;
max-width: 12rem;
margin: 0 auto;
padding: 0.67rem 1rem;
}
.container-skill {
width: 2.5rem;
height: 2.5rem;
}
}
</style>