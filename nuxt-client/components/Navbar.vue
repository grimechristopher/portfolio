<template>
  <nav>
    <ul>
      <li>Portfolio</li>
      <li>About</li>
      <li>Articles</li>
      <li>Snippets</li>
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

<script>

</script>

<style>
nav {
  background: #fcfcfc;
  
  position: sticky;
  top: 10px;
  
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
</style>