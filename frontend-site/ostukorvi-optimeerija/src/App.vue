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
  display: flex;
  width: 100%;
  line-height: 1.5;
  z-index: 100;
  top: 0;
  left: 0;
  position: fixed;
  height: 64px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
