const express = require('express');
const { getPermissions, addPermission, deletePermission } = require('../controllers/permissionController');

const router = express.Router();
router.get('/all', getPermissions);
router.post('/', addPermission);
router.delete('/:id', deletePermission);


module.exports = router;