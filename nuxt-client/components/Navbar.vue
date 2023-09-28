<template>
  <nav id="navbar" ref="navbar">
    <ul>
      <li></li>
      <li>About</li>
      <li>Articles</li>
      <li>ugh</li>
      <li>Resume</li>
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

    initialWindowHeight = window.innerHeight;
    currentWindowHeight = window.innerHeight;
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