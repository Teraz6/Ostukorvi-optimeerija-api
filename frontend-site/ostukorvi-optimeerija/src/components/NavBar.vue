<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue'

const router = useRouter()
const user = ref(null)

// Function to check if user is logged in
const checkUser = () => {
  const savedUser = localStorage.getItem('user')
  user.value = savedUser ? JSON.parse(savedUser) : null
}

// Check when component loads
onMounted(() => {
  checkUser()
})

// Re-check every time we navigate (important for login/logout)
watch(() => router.currentRoute.value.path, () => {
  checkUser()
})

const logout = () => {
  localStorage.removeItem('user')
  user.value = null
  router.push('/login')
}
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
      <RouterLink v-if="user" to="/baskets">Baskets</RouterLink>
      <RouterLink to="/profiles">Profile</RouterLink>
    </nav> 
    
    <nav class="nav-right">
      <template v-if="user">
        <span class="user-name">Hi, {{ user.Name }}</span>
        <a href="#" @click.prevent="logout">Logout</a>
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
