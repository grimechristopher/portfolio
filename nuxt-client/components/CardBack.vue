<template>
  <div class="header-color-bar"></div>
  <div class="container-back">
    <div class="container-bullets">
      <div class="container-bullet" v-for="bullet in global.Bullets">
        <div class="bullet-icon">
          <client-only><font-awesome-icon :icon="bullet.FontAwesomeIconClass" /></client-only>
        </div>
        <div class="bullet-text">
          <h3>
            <span v-if="bullet.ShowDate">{{calcualateYears(bullet.StartDate)}} years</span>
            {{ bullet.Title }}
          </h3>
          <h4 class="bullet-location" v-if="bullet.Location">{{ bullet.Location }}</h4>
        </div>
      </div>
    </div>

    <div class="container-skills">
      <div class="container-skill" v-for="skill in global.Technologies">
        <svg role="img" :viewBox="skill.Viewbox" xmlns="http://www.w3.org/2000/svg">
          <title>{{ skill.Title }}</title>
          <path :fill="`#${skill.Color}`" :d="skill.Svg"/>
        </svg>
      </div>
    </div>

    
  </div>
  <!-- <div class="footer-spacer-bar"></div> -->
  <div class="footer-color-bar"></div>

</template>

<script lang="ts" setup>
const { find } = useStrapi4();
const globalResponse = await find('global', {
  populate: 'deep',
}).catch(() => null);
const global = globalResponse?.data.attributes;

function calcualateYears(date) {
  if (date) {
    const now = Date.now();
    const then = Date.parse(date);
    console.log(now, then)
    const since = now - then;
    const years = Math.floor(since / 1000 / 60 / 60 / 24 / 365.25);
    return `${years}+ `;
  }
  return null;
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

.footer-spacer-bar {
  /* background-color: #234e70; */
  width: 100%;
  height: 5%;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.container-back {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 86%;
}

/* .container-back-child {
  flex: 1 1 50%;
} */

.container-bullet {
  display: grid;
  grid-template-columns: 1fr 6fr;
  padding: 0.33rem 0;
}
.container-bullet h3 {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  /* font-weight: 300; */
  /* font-size: 0.95rem; */
}

.container-bullet h4 {
  margin: 0;
  font-weight: 300;
  font-style: italic;
  font-size: 0.85rem;
}

.bullet-icon {
  display: flex;
  justify-content: center;
  padding-top: 12%;
  /* align-items: center; */
}

.bullet-location {
  font-style: italic;
}

.container-skills {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.67rem;
  /* align-items: center; */
  justify-content: center;
  padding: 0.67rem 1rem;
}
.container-skill {
  width: 15%;
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
    justify-content: end;
    padding: 0.67rem;
  }

  .container-skills {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    gap: 0.67rem;
    align-items: center;
    justify-content: center;
    align-content: center;
    /* padding: 3rem 3rem; */
  }

  .container-skill {
    min-width: 18%;
    max-width: 35%;
  }
}


</style>