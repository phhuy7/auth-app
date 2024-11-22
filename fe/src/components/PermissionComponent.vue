<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title>
        <v-row align="center" justify="space-between" style="width: 100%;">
          <v-col>
            <span class="text-h5">Permission List</span>
          </v-col>
          <v-col class="d-flex" style="justify-content: flex-end;">
            <v-btn color="blue" @click="openCreateDialog">Create Permission</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <!-- Show loading indicator if no permissions are loaded yet -->
        <v-container v-if="permissions.length === 0" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p>Loading permissions...</p>
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
                v-for="permission in permissions"
                :key="permission._id"
                class="py-3"
                style="border-bottom: 1px solid #eee;"
              >
                <td>{{ permission._id }}</td>
                <td>{{ permission.name }}</td>
                <td>{{ permission.description }}</td>
                <td>{{ permission.createdAt }}</td>
                <td>{{ permission.updatedAt }}</td>
                <td>
                  <v-btn color="blue" small @click="openEditDialog(permission)" class="mr-2">
                    Edit
                  </v-btn>
                  <v-btn color="red" small @click="deletePermission(permission._id)" class="mr-2">
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
          <span class="text-h5">Edit permission</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field
              v-model="editedPermission.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="editedPermission.description"
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

    <!-- Create Permission Dialog -->
    <v-dialog v-model="createDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create permission</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="createForm">
            <v-text-field
              v-model="createdPermission.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="createdPermission.description"
              label="Description"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeCreateDialog">Cancel</v-btn>
          <v-btn color="primary" @click="createPermission">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import api from "@/services/axios";

export default {
  name: "PermissionComponent",
  data() {
    return {
      permissions: [],
      editDialog: false,
      createDialog: false,
      editedPermission: {
        name: "",
        description: "",
      },
      createdPermission: {
        name: "",
        description: "",
      }
    };
  },
  methods: {
    async fetchPermissions() {
      try {
        const response = await api.get("/permission/getAllPermissions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.permissions = response.data;
      } catch (error) {
        console.error("Failed to fetch permissions:", error);
      }
    },
    openEditDialog(permission) {
      this.editedPermission = { ...permission };
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
        await api.put(`/permission/updatePermission/${this.editedPermission._id}`, this.editedPermission, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.fetchPermissions();
        this.closeEditDialog();
      } catch (error) {
        console.error("Failed to save permission:", error);
      }
    },
    async createPermission() {
      try {
        await api.post(`/permission/createPermission`, this.createdPermission, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.fetchPermissions();
        this.closeCreateDialog();
      } catch (error) {
        console.error("Failed to create permission:", error);
      }
    },

    async deletePermission(permissionId) {
      try {
        await api.delete(`/permission/deletePermission/${permissionId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        this.permissions = this.permissions.filter((permission) => permission._id !== permissionId);
      } catch (error) {
        console.error("Failed to delete permission:", error);
      }
    },
  },
  mounted() {
    this.fetchPermissions();
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
