<template>
    <div id="resume-print" class="resume-content">
        <div class="resume-header">
            <div class="resume-name">
                <h1 class="name-text">{{ resume.Name }}</h1>
                <h2 class="title-text">{{ resume.Title }}</h2>
                <h2 class="address-text">{{ resume.Address }}</h2>
                <h2>{{ resume.Phone }}</h2>
            </div>
            <div class="resume-links">
                <div 
                    class="resume-link"
                    v-for="link in resume.Links"
                >
                    <a :href="link?.Url">
                        <span></span><span>{{ link?.Text }}</span></a>
                </div>
            </div>
        </div>
        <div class="resume-skills">
            <h2 v-if="resume.Skills" class="section-header">Skills</h2>
            <div>
                {{  resume.Skills.map(skill => skill.Text).join(' • ') }}
            </div>
        </div>
        <div class="resume-experience">
            <h2 v-if="resume.WorkExperience" class="section-header">Experience</h2>
            <div v-for="experience in resume.WorkExperience">
                <div class="experience-header">
                    <div class="experience-title">
                        <h3>{{ experience.Position }}</h3>
                        <div class="experience-company">
                            <h3>{{ experience.Company }}</h3>
                            <h4>{{ experience.Location }}</h4>
                        </div>
                    </div>
                    <div class="experience-date">
                        <div>
                            <span v-if="experience.StartDate">{{ monthYearFormat(experience.StartDate) }}</span>
                            <span v-if="experience.EndDate"> - {{ monthYearFormat(experience.EndDate) }}</span>
                            <span v-else> - Present</span>
                        </div>
                        <div>
                            <span v-if="experience.EmploymentType">{{ experience.EmploymentType }}</span>
                        </div>
                    </div>
                </div>
                <div class="experience-body">
                    <ul>
                        <li v-for="bullet in experience.Bullets">
                            {{ bullet.Text }}
                        </li>
                    </ul>
                </div>                
            </div>
        </div>
        <div class="resume-education">
            <h2 v-if="resume.Education" class="section-header">Experience</h2>
            <div v-for="education in resume.Education">
                <div class="education-header">
                    <div class="education-title">
                        <h3>{{ education.Degree }}</h3>
                        <h3 class="school-text">{{ education.School }}</h3>
                    </div>
                    <div class="education-date">
                        <span v-if="education.EndDate && education.Graduated">Graduated {{ yearFormat(education.EndDate) }}</span>
                        <span v-else-if="education.EndDate && !education.Graduated">Expected {{ monthYearFormat(education.EndDate) }}</span>
                    </div>
                </div>
                <div class="education-body">
                    <ul>
                        <li v-for="bullet in education.Bullets">
                            {{ bullet.Text }}
                        </li>
                    </ul>
                </div>                
            </div>
        </div>
        <div class="resume-publications">
            <h2 v-if="resume.Publications" class="section-header">Publications</h2>
            <div v-for="publication in resume.Publications">
                <p>{{ publication.Citation }}</p>             
            </div>
        </div>
    </div>
</template>
<script setup>
// const config = useRuntimeConfig();
const { find } = useStrapi4();
const resumeResponse = await find('resume', {
  populate: 'deep',
}).catch(() => null);
const resume = resumeResponse?.data.attributes;

function yearFormat(date) {
    return new Date(date).getFullYear();
}

function monthYearFormat(date) {
    return new Date(date).toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

</script>
<style scoped>
h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-size: 12pt;
}

.resume-content {
    margin: 0.5in;
}

.resume-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.resume-link a {
    font-weight: 400;
    text-decoration: none;
    color: var(--cg-blue);
    border-bottom: solid 1px var(--cg-blue);
}

.experience-header, .education-header {
    display: grid;
    grid-template-columns: 2fr 1fr;
}

.resume-links, .experience-date, .education-date{
    text-align: right;
    font-weight: 700;
}

.resume-links {
    align-self: end;
}

.section-header {
    border-bottom: solid 2px var(--cg-blue);
    margin-top: 1em;
}

.name-text {
    color: var(--cg-blue);
    font-size: 1.75em;
    font-weight: 400;
}

.title-text, .address-text {
    font-weight: 400;
    font-size: 90%;
}

.experience-company {
    /* display: inline-block; */
    /* gap: 0.5em; */
}
.experience-company h3, .experience-company h4, .school-text {
    font-weight: 400;
    font-style: italic;
}



@media screen and (min-width: 8.5in) {
    .resume-content {
        margin: 1in;
    }
}

@media (max-width: 640px) {
    .resume-content {
        margin: 1em;
    }
    .resume-header {
        display: block;
    }
    .resume-links {
        text-align: left;
    }
}
</style>    