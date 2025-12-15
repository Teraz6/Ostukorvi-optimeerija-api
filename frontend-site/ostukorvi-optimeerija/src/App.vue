<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <RouterView/>
</template>

<style scoped>
header {
  width: 100%;
  background-color: pink;
  line-height: 1.5;
  z-index: 100;
  top: 0;
  left: 0;
  position: fixed;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 64px;
}

.logo {
  display: block;
  align-items: start;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 16px;
  text-align: center;
  height: 64px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
