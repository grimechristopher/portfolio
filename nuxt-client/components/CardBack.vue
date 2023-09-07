<template>
  <div>
    <div v-for="bullet in global.Bullets">
      <div class="container-bullet">
        <font-awesome-icon :icon="bullet.FontAwesomeIconClass" />
        <h3><span v-if="bullet.showDate">{{calcualateYears(bullet.StartDate)}}</span>{{ bullet.Text }}</h3>
        <!-- <font-awesome-icon :icon="bullet.FontAwesomeIconClass" />
        <h3><span>{{bullet.StartDate}}</span>{{ bullet.Text }}</h3> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { find } = useStrapi4();
const globalResponse = await find('global', {
  populate: 'deep',
}).catch(() => null);
const global = globalResponse?.data.attributes;

function calcualateYears(date) {
  const now = Date.now();
  const then = Date.parse(date);
  console.log(now, then)
  const since = now - then;
  const years = Math.floor(since / 1000 / 60 / 60 / 24 / 365.25);
  return `${years}+ `;
}
</script>

<style scoped>
.container-bullet {
  display: flex;
  /* flex-direction: row; */
  /* align-items: center; */
  /* padding: 0.5rem 0; */
}
.container-bullet h3 {
  margin: 0;
}
</style>