<template>
  <div id="container-card-front">
    <div id="container-icon">
      <img id="card-main-icon" :src="config.apiUrl + global.SiteIcon.data.attributes.url">
    </div>
    <div id="container-social-links">
      <div v-for="link in global.SocialLinks">
        <NuxtLink 
          class="social-link" 
          :to="link.Url" 
          @click.stop target="_blank">
            <client-only>
              <font-awesome-icon
                :icon="link.FontAwesomeIconClass" 
                :title="link.Url" 
                size="3x"
              /><span>{{ link.Text }}</span>
            </client-only>
        </NuxtLink>
      </div>
    </div>
    <div id="container-title">
      <h1>{{ global.Title }}</h1>
      <h2>{{ global.Tagline }}</h2>
    </div>
  </div>
  <div class="footer-color-bar"></div>

</template>

<script setup>
const config = useRuntimeConfig();
const { find } = useStrapi4();
const globalResponse = await find('global', {
  populate: 'deep',
}).catch(() => null);
const global = globalResponse?.data.attributes;
</script>

<style scoped>
.footer-color-bar {
  background-color: #234e70;
  width: 100%;
  height: 7.5%;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

#container-social-links {
  /* text-align: right; */
  /* display: flex; */
  /* flex: 1; */
  color: #2f2f3f;
}

.social-link {
  color: #2f2f3f;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  text-decoration: none;
  width: fit-content;
}

.social-link svg {
  padding-right: 0.33rem;
}

.social-link span {
  font-size: 1rem;
  font-weight: 600;
  border-bottom: #2f2f3f 1px solid;
}

#container-social-links > div {
  /* padding-right: 0.67rem; */
  padding: 0.33rem 0;

}

#container-icon {
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  /* width: 50%; */
}

#container-title {
  color: #2f2f3f;
  padding: 0 0 0 0;
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

h1,
h2,
h3 {
  margin: 0;
}

#card-main-icon {
  max-width: 50%;
  max-height: 100%;
}

#container-card-front {
  height: 92.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  /* justify-content: flex-end; */
  padding: 1rem;
}

@media (min-width: 640px) {
  #container-card-front {
    height: 100%;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: space-between; */
    /* align-items: flex-start; */
    /* justify-content: flex-end; */
    padding: 1rem;
    flex-wrap: wrap;
  }


  #container-icon {
    flex: 1;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    min-width: 20%;
    min-height: 20%;
    max-width: 45%;
    max-height: 45%;
    /* flex-basis: fit-content; */
    /* width: 50%; */
  }

  #card-main-icon {
    max-width: 100%;
    max-height: 100%;
    padding-bottom: 0.33rem;
  }

  #container-social-links {
    flex-shrink: 0;
  }

  .social-link svg {
    font-size: 2em;
    padding-right: 0.67rem;
  }

  #container-title {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 0.67rem;
  }

  .footer-color-bar {
    display: none;
  }


}
</style>