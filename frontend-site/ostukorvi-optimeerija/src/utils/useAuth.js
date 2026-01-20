import { ref, computed } from 'vue'

export function useAuth() {
  const profile = ref(null)

  const checkProfile = () => {
    const savedProfile = localStorage.getItem('profile')
    profile.value = savedProfile ? JSON.parse(savedProfile) : null
  }

  const logout = () => {
    localStorage.removeItem('profile')
    profile.value = null// This clears the navbar instantly!
  }
  // Initial check
  checkProfile()

  const isLoggedIn = computed(() => !!profile.value)
  
  // The Admin Check
  const isAdmin = computed(() => {
    return profile.value && (profile.value.IsAdmin === true || profile.value.IsAdmin === "true")
  })

  return {
    profile,
    isLoggedIn,
    isAdmin,
    checkProfile,
    logout
  }
}