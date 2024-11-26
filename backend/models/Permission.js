const mongoose = require('mongoose');

const Permission = mongoose.model("Permission", {
    name: { type: String, required: true},
    description: { type: String }
})

module.exports = Permission;