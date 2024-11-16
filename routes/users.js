const express = require("express")
const router = express.Router()
const db = require("../database.js")
const { 
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser } = require("../controllers/usersControllers.js")

router.get("/users", getAllUsers)

router.post('/users', createNewUser)

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);
module.exports = router;