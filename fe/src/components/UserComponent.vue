<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5">User List</v-card-title>
      <v-card-text>
        <!-- Show loading indicator if no users are loaded yet -->
        <v-container v-if="users.length === 0">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p>Loading users...</p>
        </v-container>

        <!-- Table when data is loaded -->
        <v-container v-else>
          <v-data-table
            :headers="headers"
            :items="users"
            class="elevation-1"
            dense
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Users</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="fetchUsers">
                  Refresh
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import api from '@/services/axios';

export default {
  name: 'UserComponent',
  data() {
    return {
      users: [], // List of users
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
      ],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.get('/user/getAllUsers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        });
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
  },
  mounted() {
    this.fetchUsers(); // Fetch users when component loads
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
