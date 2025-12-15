<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <img alt="Optimeerija logo" class="logo" src="@/assets/logo.svg" width="64" height="64" />
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/products">Products</RouterLink>
  </nav> 
</template>

<style scoped/>