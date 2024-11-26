const mongoose = require('mongoose');

const User = mongoose.model("User", {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

module.exports = User;
