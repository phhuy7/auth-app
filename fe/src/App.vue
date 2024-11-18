<template>
  <v-app>
    <v-app-bar app>
      <v-btn text @click="goToHomePage">
        <v-toolbar-title>My App</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>

      <!-- Show Login Button if not authenticated -->
      <v-btn v-if="!isAuthenticated" color="primary" @click="goToLoginPage">
        Login
      </v-btn>

      <!-- Show Logout Button if authenticated -->
      <v-btn v-if="isAuthenticated" color="primary" @click="logout">
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']; // Use namespaced getter
    },
  },
  methods: {
    goToHomePage() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
    }
  },
    goToLoginPage() {
      if (this.$route.path !== '/login') {
        this.$router.push('/login');
    }
  },
    logout() {
      this.$store.dispatch('auth/logout'); // Use namespaced action
      this.$router.push('/login');
    },
  },
};
</script>
