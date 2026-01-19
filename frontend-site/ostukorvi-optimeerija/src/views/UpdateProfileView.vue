<script>
export default {
    name: "UpdateProfileView",
    props: {
        seekID: {
            type: String,
            required: true
        }
    },
  data() {
    return {
      profile: {
        Name: "",
        Email: "",
        PasswordHASH: "",
        IsAdmin: false
      },
      passwordConfirm: '',
    };
  },
  async created() {
    try {
        const response = await fetch(`http://localhost:8080/profiles/${this.seekID}`);
        this.profile = await response.json();
    }
    catch (error) {
        console.error("Error fetching profile details:", error);
    }
  },
  computed: {
    passwordError() {
        if (this.profile.PasswordHASH && this.passwordConfirm) {
            return this.profile.PasswordHASH !== this.passwordConfirm;
        }
        return false;
    }
  },
  methods: {
    async updateProfile() {
        try {
            if (this.passwordError) {
                alert("Please fix the errors");
                return;
            }

            const response = await fetch(`http://localhost:8080/profiles/${this.seekID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(this.profile)
            });

            if (response.ok) {
                alert("Profile updated successfully!");
                this.$router.push('/profiles');
            } else {
                alert("Error updating profile");
            }
        } catch (error) {
            console.error("Connection error:", error);
        }
    }
  }
};
</script>

<template>
  <div class="form-container">
    <h1>Update Profile</h1>

    <form @submit.prevent="updateProfile">
    
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

      <div class="form-group">
        <label>Confirm Password</label>
        <input v-model="passwordConfirm" type="password" />
        <span v-if="passwordError" style="color:red;">Passwords don't match</span>
      </div>

      <div class="form-group checkbox-group">
        <label>
          <input v-model="profile.IsAdmin" type="checkbox" />
          Is Admin
        </label>
      </div>

      <div class="btn-group">
        <button :disabled="passwordError" type="submit" class="save-btn">Save Profile</button>
        <button type="button" class="cancel-btn" @click="$router.push('/profiles')">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>