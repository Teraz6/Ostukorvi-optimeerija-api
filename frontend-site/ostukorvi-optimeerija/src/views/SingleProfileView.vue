<script>
export default {
  name: "SingleProfileView",
  props: {
    seekID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      thisProfile: {
        ProfileID: "",
        Email: ""
        // lisa siia vajadusel teisi välju, mida backend tagastab
      }
    };
  },
  async created() {
    try {
      const response = await fetch(`http://localhost:8080/profiles/${this.seekID}`);
      this.thisProfile = await response.json();
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  }
};
</script>

<template>
  <table class="custom-table">
    <thead>
      <tr>
        <td colspan="2" class="text-center">
          <RouterLink to="/profiles" class="view-btn">
            Back to profiles
          </RouterLink>
        </td>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Profile ID</td>
        <td>{{ thisProfile.ProfileID }}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{{ thisProfile.Email }}</td>
      </tr>
    </tbody>
  </table>
</template>