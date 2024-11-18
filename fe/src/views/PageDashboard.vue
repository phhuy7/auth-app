<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <UserComponent />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import UserComponent from '../components/UserComponent.vue'; // Ensure correct path
  
  export default {
    name: 'PageDashboard',
    components: {
      UserComponent, // Register the component
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Add custom styles if needed */
  </style>
  