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
};
</script>

<template>
  <main>
    <ProfileTable :items="allProfiles" />
  </main>
</template>
