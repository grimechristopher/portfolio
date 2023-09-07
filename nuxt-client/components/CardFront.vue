<template>
  <div id="container-card-front">
    <div id="container-icon">
      <img id="card-main-icon" :src="'http://127.0.0.1:1337' + global.SiteIcon.data.attributes.url">
    </div>
    <div>
      <div id="container-title">
        <h1>{{ global.Title }}</h1>
        <h2>{{ global.Tagline }}</h2>
      </div>
      <div id="container-social-links">
        <div v-for="link in global.SocialLinks">
          <NuxtLink class="social-link" :to="link.Url" @click.stop target="_blank"><font-awesome-icon :icon="link.FontAwesomeIconClass" :title="link.Url" size="4x" /></NuxtLink>
        </div>
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
</script>

<style scoped>
*, *::before, *::after {
  box-sizing: border-box;
}

#container-social-links {
  display: flex;
  flex: 1;
  color: #2f2f3f;
}

.social-link {
  color: #2f2f3f;
}

#container-social-links > div {
  padding-right: 0.67rem;
}

#container-icon {
  width: 25%;
}

#container-title {
  color: #2f2f3f;
  padding: 0.75rem 0 1.25rem 0;
}

#container-title h1 {
  font-size: 2.5rem;
  font-weight: 400;
  min-width: 0;
  width: fit-content;
  border-bottom: 2px solid #2f2f3f;
}

#container-title h2 {
  font-weight: 300;
}

h1, h2, h3 {
  margin: 0;
}

#card-main-icon {
  max-width: 100%;
  max-height: 100%;
}

#container-card-front {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
}

</style>