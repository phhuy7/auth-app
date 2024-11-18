<template>
  <v-container fluid>
    <!-- Center the form vertically and horizontally -->
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title class="text-h5 justify-center">Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field 
                v-model="username" 
                label="Username" 
                outlined 
                required
              ></v-text-field>
              <v-text-field 
                v-model="password" 
                label="Password" 
                type="password" 
                outlined 
                required
              ></v-text-field>
              <v-btn 
                color="primary" 
                block 
                class="mt-4" 
                @click="login"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services/axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token; // Assume the token is returned
        this.$store.dispatch('auth/login', token); // Use Vuex namespaced action
        this.$router.push('/dashboard'); // Redirect to the homepage
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
