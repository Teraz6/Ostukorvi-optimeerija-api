<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Login</h1>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            id="email"
            v-model="loginData.LoginEmail" 
            type="email" 
            placeholder="name@company.com"
            required 
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password"
            v-model="loginData.LoginPassword" 
            type="password" 
            placeholder="••••••••"
            required 
          />
        </div>

        <div v-if="errorMessage" class="error-msg">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      loginData: {
        LoginEmail: "",
        LoginPassword: ""
      },
      loading: false,
      errorMessage: ""
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = "";

      try {
        const response = await fetch("http://localhost:8080/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(this.loginData)
        });

        const result = await response.json();

        if (response.ok) {
          // Success! result contains ProfileID, Name, etc.
          console.log("Logged in user:", result);
          
          // Save to localStorage so other parts of the app know who is logged in
          localStorage.setItem("user", JSON.stringify(result));
          
          // Redirect to a home page
          this.$router.push("/");
        } else {
          // Show the error message from your backend controller
          this.errorMessage = result.error || "Login failed. Please try again.";
        }
      } catch (err) {
        this.errorMessage = "Unable to connect to the server.";
        console.error("Login error:", err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>