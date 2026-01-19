<script>
import ProfileTable from "../components/ProfileTable.vue";

export default {
  components: {
    ProfileTable,
  },
  data() {
    return {
      allProfiles: [],
    };
  },
  async created() {
    this.allProfiles = await (
      await fetch("http://localhost:8080/profiles")
    ).json();
  },
  methods: {
    async deleteProfile(profileId) {
      const ok = confirm("Are you sure you want to delete this profile?");
      if (!ok) return;

      const res = await fetch(
        `http://localhost:8080/profiles/${profileId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      // delete profile
      this.allProfiles = this.allProfiles.filter(
        p => p.ProfileID !== profileId
      );
    }
  }
};
</script>

<template>
  <main>
    <ProfileTable 
    :items="allProfiles" 
    @delete="deleteProfile"
    />
  </main>
</template>
