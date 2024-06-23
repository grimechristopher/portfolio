<template>
  <div class="about-section"> 
    <h2>About Chris</h2>
    <StrapiBlocksText :nodes="about.AboutMe" />
    <h2>About This Site</h2>
    <StrapiBlocksText :nodes="about.AboutSite" />
  </div>
</template>
<script setup>
const { find } = useStrapi4();
const aboutResponse = await find('about', {
  populate: 'deep',
}).catch(() => null);
const about = aboutResponse?.data.attributes;
</script>
<style scoped>
.about-section {
  margin: 0 auto;
  margin-top: 3rem;
  max-width: 45em;
}

.about-section h2 {
  /* margin-top: 2rem; */
  font-size: 2rem;
}

.about-section p {
  line-height: 1.4;
  margin-left: 1rem;
  margin-right: 1rem;
}

.about-link-button {
    margin: 0.33em;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    color:var(--cg-blue);
    background-color: transparent;
    border: 2px solid var(--cg-blue);
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
}

.about-link-button:hover {
  color: #ffffff;
  background-color: var(--cg-blue);
}
</style>