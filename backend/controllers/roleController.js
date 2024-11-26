const Role = require('../models/Role')
const User = require('../models/User')

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions', 'name');
        res.status(200).json({ success: true, data: roles });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching roles", error: error.message });
    }
}


const addRole = async (req, res) => {
    const { name, permissions } = req.body;


    const existingRole = await Role.findOne({ name });
    if (existingRole) {
        return res.status(400).json({ success: false, message: "Role with this name already exists" });
    }

    try {

        const role = new Role({
            name,
            permissions
        });

        await role.save();

        res.status(201).json({
            success: true,
            message: 'Role added',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding role", error: error.message });
    }

}

const editRole = async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;

    try {
        const role = await Role.findById(id);
        if (name && name !== role.name) {
            const existingRole = await Role.findOne({ name });
            if (existingRole) {
                return res.status(400).json({
                    success: false,
                    message: 'Role with this name already exists'
                });
            }
        }

        await Role.findByIdAndUpdate(
            id,
            {
                name: name || role.name,
                permissions: permissions || role.permissions,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Role updated',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating role',
            error: error.message
        });
    }
};

const deleteRole = async (req, res) => {
    const { id } = req.params;

    try {

        const usersWithRole = await User.findOne({ roles: id });
        if (usersWithRole) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete role as it is assigned to users'
            });
        }

        await Role.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Role deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting role',
            error: error.message
        });
    }

}


module.exports = { getRoles, addRole, editRole, deleteRole }