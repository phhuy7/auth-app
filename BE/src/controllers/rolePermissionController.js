const RolePermission = require('../models/RolePermission');

// Create a new rolePermission
const createRolePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    // Create new rolePermission
    rolePermission = new RolePermission({ roleId, permissionId });
    await rolePermission.save();

    res.status(201).json(rolePermission);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all rolePermissions
const getRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.find();
    res.status(200).json(rolePermissions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a single rolePermission by ID
const getRolePermissionById = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findById(req.params.id);
    if (!rolePermission) {
      return res.status(404).json({ msg: 'RolePermission not found' });
    }
    res.status(200).json(rolePermission);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update a rolePermission
const updateRolePermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    const rolePermission = await RolePermission.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!rolePermission) {
      return res.status(404).json({ msg: 'RolePermission not found' });
    }
    res.status(200).json(rolePermission);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a rolePermission
const deleteRolePermission = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findByIdAndDelete(req.params.id);
    if (!rolePermission) {
      return res.status(404).json({ msg: 'RolePermission not found' });
    }
    res.status(200).json({ msg: 'RolePermission deleted successfully' });
  } catch (error) {
    console.error(error.message);const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if user already exists
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({ name, description });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { name, description } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

    res.status(500).send('Server Error');
  }
};

module.exports = {
  createRolePermission,
  getRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission,
};
