<template>
  <nav id="navbar" ref="navbar">
    <ul>
      <li></li>
      <li><NuxtLink :to="{ path: '/', hash: '#placeholder' }">About</NuxtLink></li>
      <li><NuxtLink :to="{ path: '/projects', hash: '#placeholder' }">Projects</NuxtLink></li>
      <li><NuxtLink :to="{ path: '/articles', hash: '#placeholder' }">Articles</NuxtLink></li>
    </ul>

    <div class="navbar-button">
      <label for="navbar-checkbox">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  </nav>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  const navbar = ref();

  onMounted(() => {
    window.addEventListener('scroll', onScroll);
  })  
  
  function onScroll() {
    if (window.scrollY > window.innerHeight - navbar.value.offsetHeight) {
      navbar.value.classList.add('sticky');
    } else {
      navbar.value.classList.remove('sticky');
    }
  }
</script>

<style>
nav {
  background: #fcfcfc;
}
nav ul {
  display: flex;
  list-style: none;
  gap: 0.33rem;
  padding: 0.33rem 0;
  margin: 0;

  font-size: 1.5rem;
  overflow: scroll;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>