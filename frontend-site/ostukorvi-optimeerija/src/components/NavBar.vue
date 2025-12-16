<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Optimeerija logo" class="logo" src="@/assets/logo.svg" width="64" height="64" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/products">Products</RouterLink>
    </nav> 
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center; 
  padding: 0.5rem 2rem;
  background-color: #daf9ff; 
  gap: 2rem;
}

nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #000;
  font-size: 24px;
}

nav a.router-link-exact-active {
  color:#02c6f7;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

.logo {
  align-items: left;
  padding: 4px;
}

@media (min-width: 1024px) {
  .logo {
    align-items: left;
  }
}
</style>