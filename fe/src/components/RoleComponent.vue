<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title>
        <v-row align="center" justify="space-between" style="width: 100%;">
          <v-col>
            <span class="text-h5">Role List</span>
          </v-col>
          <v-col class="d-flex" style="justify-content: flex-end;">
            <v-btn color="blue" @click="openCreateDialog">Create Role</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <!-- Show loading indicator if no roles are loaded yet -->
        <v-container v-if="roles.length === 0" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p>Loading roles...</p>
        </v-container>

        <!-- Clean table when data is loaded -->
        <v-container v-else>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
                <th class="text-left">Created at</th>
                <th class="text-left">Updated at</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="role in roles"
                :key="role._id"
                class="py-3"
                style="border-bottom: 1px solid #eee;"
              >
                <td>{{ role._id }}</td>
                <td>{{ role.name }}</td>
                <td>{{ role.description }}</td>
                <td>{{ role.createdAt }}</td>
                <td>{{ role.updatedAt }}</td>
                <td>
                  <v-btn color="blue" small @click="openEditDialog(role)" class="mr-2">
                    Edit
                  </v-btn>
                  <v-btn color="red" small @click="deleteRole(role._id)" class="mr-2">
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
          <span class="text-h5">Edit role</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field
              v-model="editedRole.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="editedRole.description"
              label="Description"
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

    <!-- Create Role Dialog -->
    <v-dialog v-model="createDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create role</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="createForm">
            <v-text-field
              v-model="createdRole.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="createdRole.description"
              label="Description"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeCreateDialog">Cancel</v-btn>
          <v-btn color="primary" @click="createRole">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import api from "@/services/axios";

export default {
  name: "RoleComponent",
  data() {
    return {
      roles: [],
      editDialog: false,
      createDialog: false,
      editedRole: {
        name: "",
        description: "",
      },
      createdRole: {
        name: "",
        description: "",
      }
    };
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await api.get("/role/getAllRoles", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.roles = response.data;
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    },
    openEditDialog(role) {
      this.editedRole = { ...role };
      this.editDialog = true;
    },
    closeEditDialog() {
      this.editDialog = false;
    },

    openCreateDialog() {
      this.createDialog = true;
    },
    closeCreateDialog() {
      this.createDialog = false;
    },

    async saveEdit() {
      try {
        await api.put(`/role/updateRole/${this.editedRole._id}`, this.editedRole, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.fetchRoles();
        this.closeEditDialog();
      } catch (error) {
        console.error("Failed to save role:", error);
      }
    },
    async deleteRole(roleId) {
      try {
        await api.delete(`/role/deleteRole/${roleId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.roles = this.roles.filter((role) => role._id !== roleId);
      } catch (error) {
        console.error("Failed to delete role:", error);
      }
    },
    async createRole() {
      try {
        await api.post(`/role/createRole`, this.createdRole, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.fetchRoles();
        this.closeCreateDialog();
      } catch (error) {
        console.error("Failed to create role:", error);
      }
    },

  },
  mounted() {
    this.fetchRoles();
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
