<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title class="text-h5">User List</v-card-title>
      <v-card-text>
        <!-- Show loading indicator if no users are loaded yet -->
        <v-container v-if="users.length === 0" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p>Loading users...</p>
        </v-container>

        <!-- Clean table when data is loaded -->
        <v-container v-else>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Username</th>
                <th class="text-left">Email</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key="user._id"
                class="py-3"
                style="border-bottom: 1px solid #eee;"
              >
                <td>{{ user._id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <v-btn color="blue" small @click="openEditDialog(user)" class= "mr-2">
                    Edit
                  </v-btn>
                  <v-btn color="red" small @click="deleteUser(user._id)" class = "mr-2">
                    Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-container>
      </v-card-text>
    </v-card>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit User</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field
              v-model="editedUser.username"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="editedUser.email"
              label="Email"
              type="email"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeEditDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveEdit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "@/services/axios";

export default {
  name: "UserComponent",
  data() {
    return {
      users: [],
      editDialog: false,
      editedUser: {
        username: "",
        email: "",
      },
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.get("/user/getAllUsers", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    openEditDialog(user) {
      this.editedUser = { ...user };
      this.editDialog = true;
    },
    closeEditDialog() {
      this.editDialog = false;
    },
    async saveEdit() {
      try {
        await api.put(`/user/updateUser/${this.editedUser._id}`, this.editedUser, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        console.log(this.editedUser._id);
        this.fetchUsers();
        this.closeEditDialog();
      } catch (error) {
        console.error("Failed to save user:", error);
      }
    },
    async deleteUser(userId) {
      try {
        await api.delete(`/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.users = this.users.filter((user) => user._id !== userId);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}
td {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
