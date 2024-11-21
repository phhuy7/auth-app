<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app>
      <v-btn v-if="isAuthenticated" text @click="toggleSidebar">
        <v-icon>mdi-menu</v-icon> <!-- Icon to toggle the sidebar -->
      </v-btn>
      <v-btn text @click="navigateToPage('homepage')">
        <v-toolbar-title>My App</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>

      <!-- Show Login Button if not authenticated -->
      <v-btn v-if="!isAuthenticated" color="primary" @click="navigateToPage('login')" class="mr-2">
        Login
      </v-btn>

      <v-btn v-if="!isAuthenticated" color="primary" @click="navigateToPage('register')" class="mr-2">
        Register
      </v-btn>

      <!-- Show Logout Button if authenticated -->
      <v-btn v-if="isAuthenticated" color="primary" @click="logout">
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- Show sidebar only when authenticated and not on login or home page -->
      <v-container v-if="isAuthenticated" style="display: flex;">
        <v-navigation-drawer v-model="drawer" app temporary>
          <v-list>
            <v-list-item @click="navigateToPage('homepage')">
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item @click="navigateToPage('users')">
              <v-list-item-title>User</v-list-item-title>
            </v-list-item>
            <v-list-item @click="navigateToPage('roles')">
              <v-list-item-title>Role</v-list-item-title>
            </v-list-item>
            <v-list-item @click="navigateToPage('permissions')">
              <v-list-item-title>Permissions</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- Main content area -->
        <v-main style="flex-grow: 1;">
          <router-view></router-view>
        </v-main>
      </v-container>

      <!-- Show content without sidebar on login or homepage -->
      <v-container v-else>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']; // Check if authenticated
    },
  },
  methods: {
    navigateToPage(routeName) {
      // Only navigate if we're not already on the target route
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName });
      }
    },
    logout() {
      this.$store.dispatch('auth/logout');
      if (this.$route.name !== 'homepage') {
      this.$router.push({ name: 'homepage' });
    }
    },
    toggleSidebar() {
      this.drawer = !this.drawer; // Toggle the visibility of the sidebar
    },
  },
};
</script>
