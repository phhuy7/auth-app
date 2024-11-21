<template>
  <v-app>
    <!-- Main Content Area -->
    <v-main> <!-- Added min-height for full screen -->
      <v-container fluid>
        <v-row> <!-- Full screen height -->
          <v-col>
            <router-view></router-view> <!-- Displays child components based on route -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'PageDashboard',
  methods: {
    navigateToPage(routeName) {
      // Navigate to the selected route
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName });
      }
    },
  },
};
</script>
