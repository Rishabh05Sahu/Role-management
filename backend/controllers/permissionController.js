const Permission = require('../models/Permission')
const Role = require('../models/Role')

const getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.status(200).json({ success: true, data: permissions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching permissions", error: error.message });
    }
}


const addPermission = async (req, res) => {
    const { name, description } = req.body;


    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
        return res.status(400).json({ success: false, message: "Permission with this name already exists" });
    }

    try {

        const permission = new Permission({
            name,
            description,
        });

        await permission.save();

        res.status(201).json({
            success: true,
            message: 'Permission added',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding permission", error: error.message });
    }

}

const deletePermission = async (req, res) => {
    const { id } = req.params;

    try {

        const rolesWithPermission = await Role.findOne({ permissions: id });
        if (rolesWithPermission) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete permission as it is assigned to roles'
            });
        }

        await Permission.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Permission deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting permission',
            error: error.message
        });
    }

}


module.exports = { getPermissions, addPermission, deletePermission }