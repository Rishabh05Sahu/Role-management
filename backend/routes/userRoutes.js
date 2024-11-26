const express = require('express');
const { getUsers, addUser, editUser, deleteUser } = require('../controllers/userController');

const router = express.Router();
router.get('/all', getUsers);
router.post('/', addUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);


module.exports = router;