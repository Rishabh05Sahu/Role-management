const express = require('express');
const { getRoles, addRole, editRole, deleteRole, getPermissions, updatePermissions } = require('../controllers/roleController');

const router = express.Router();
router.get('/all', getRoles);
router.post('/', addRole);
router.put('/:id', editRole);
router.delete('/:id', deleteRole);


module.exports = router;