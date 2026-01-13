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

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

td {
  padding: 16px 24px;
  vertical-align: middle;
  color: var(--color-text);
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.95rem;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: #f1f5f9;
  transition: background-color 0.2s ease;
}

.text-center {
  text-align: center;
}

.view-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.view-btn:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);
}

.view-btn:active {
  transform: translateY(0);
}
</style>
