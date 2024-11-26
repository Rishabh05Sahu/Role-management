const mongoose = require('mongoose');

const Role = mongoose.model("Role", {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
})

module.exports = Role;