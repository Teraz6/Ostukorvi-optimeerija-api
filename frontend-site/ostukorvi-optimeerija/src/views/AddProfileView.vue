<script>
export default {
  data() {
    return {
      profile: {
        Name: "",
        Email: "",
        PasswordHASH: "",
        IsAdmin: false
      }
    };
  },
  methods: {
    async saveProfile() {
      try {
        const response = await fetch("http://localhost:8080/profiles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.profile)
        });

        if (response.ok) {
          alert("Profile added successfully!");
          this.$router.push("/profiles");
        } else {
          // backend error
          const text = await response.text();
          console.error("Server error:", response.status, text);
          alert("Error adding profile");
        }
      } catch (error) {
        console.error("Connection error:", error);
        alert("Connection error");
      }
    }
  }
};
</script>

<template>
  <div class="form-container">
    <h1>Add New Profile</h1>

    <form @submit.prevent="saveProfile">
    
      <div class="form-group">
        <label>Profile Name</label>
        <input v-model="profile.Name" type="text" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="profile.Email" type="email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="profile.PasswordHASH" type="password" required />
      </div>

      <div class="form-group checkbox-group">
        <label>
          <input v-model="profile.IsAdmin" type="checkbox" />
          Is Admin
        </label>
      </div>

      <div class="button-group">
        <button type="submit" class="save-btn">Save Profile</button>
        <button type="button" class="cancel-btn" @click="$router.push('/profiles')">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 20px;
  background: var(--color-background-soft);
  border-radius: 12px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
}

.save-btn {
  background: #3b82f6;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.cancel-btn {
  background: #94a3b8;
  color: white;
  margin-left: 10px;
  padding: 10px;
  border: none;
  border-radius: 8px;
}
</style>
