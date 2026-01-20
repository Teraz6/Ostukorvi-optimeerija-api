<script setup>
import { useAuth } from '@/utils/useAuth'
import { watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
const { profile, isAdmin, checkProfile, logout} = useAuth()
const route = useRoute()

// Still watch the route to update the navbar if the user logs in/out
watch(() => route.path, () => {
  checkProfile()
})

</script>

<template>
  <header>
    <img
      alt="Optimeerija logo"
      class="logo"
      src="@/assets/logo.svg"
      width="64"
      height="64"
    />

    <nav class="nav-left">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/products">Products</RouterLink>
      <RouterLink v-if="profile" to="/baskets">Baskets</RouterLink>
      <RouterLink v-if="isAdmin" to="/profiles">Profiles</RouterLink>
    </nav> 

    <nav class="nav-right">
      <template v-if="profile">
        <span class="user-name">Hi, {{ profile.Name }}</span>
        <a href="#" @click.prevent="logout(); $router.push('/')">Logout</a>
      </template>

      <template v-else>
        <RouterLink to="/signup">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </template>
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
  width: 100%;
}

.user-name {
  margin-right: 1.5rem;
  font-weight: bold;
  color: #64748b;
}

.nav-left {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-right {
  margin-left: auto;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #000;
  font-size: 24px;
}

nav a.router-link-exact-active {
  color: #02c6f7;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

.logo {
  padding: 4px;
}
</style>
