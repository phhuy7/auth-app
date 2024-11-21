<template>
  <v-container class="pa-4" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span class="text-h5">User Registration</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="formIsValid">
              <!-- Username Field -->
              <v-text-field
                v-model="username"
                label="Username"
                outlined
                :rules="usernameRules"
                required
              ></v-text-field>

              <!-- Email Field -->
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                :rules="emailRules"
                required
              ></v-text-field>

              <!-- Password Field -->
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                :rules="passwordRules"
                required
              ></v-text-field>

              <!-- Confirm Password Field -->
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                outlined
                :rules="confirmPasswordRules"
                required
              ></v-text-field>

              <!-- Submit Button -->
              <v-btn
                :disabled="!formIsValid"
                color="primary"
                @click="registerUser"
                block
              >
                Register
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
  name: "UserRegister",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      formIsValid: false, // To disable the submit button if form is invalid
      // Validation rules
      usernameRules: [(v) => !!v || "Username is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.password || "Passwords must match",
      ],
    };
  },
  methods: {
    async registerUser() {
      // Here you can call the API to register the user
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      try {
        // Make an API call to register the user
        await api.post("/auth/register", userData);
        this.$router.push("/login"); // Redirect to login page after successful registration
      } catch (error) {
        console.error("Registration failed:", error);
        // Handle errors (e.g., show an error message)
      }
    },
  },
};
</script>

<style scoped>
/* Optional: You can add custom styles here */
</style>
