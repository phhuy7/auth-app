<template>
  <v-container>
    <v-row>
      <!-- Left Column: Welcome Text -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h1>Welcome to My App</h1>
          </v-card-title>
          <v-card-text>
            <p>This is your homepage where you can add content that describes your app or website.</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Right Column: Optional Image or Extra Content -->
      <v-col cols="12" md="6">
        <v-img src="https://via.placeholder.com/500x300" alt="Placeholder Image"></v-img>
      </v-col>
    </v-row>

    <!-- Example of a footer or additional information -->
    <v-row>
      <v-col cols="12">
        <v-footer>
          <v-col class="text-center">
            <p>© 2024 MyApp. All rights reserved.</p>
          </v-col>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
  }
};
</script>

<style scoped>
/* Add custom styles for the homepage if necessary */
</style>
