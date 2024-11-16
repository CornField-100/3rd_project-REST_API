const express = require("express")
const router = express.Router()
const { checkApiKey } = require("../middleware/checkApiKey.js")
const { 
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser } = require("../controllers/usersControllers.js")

router.get("/users", checkApiKey, getAllUsers)

router.post("/users", checkApiKey, createNewUser)

router.put("/users/:id", checkApiKey, updateUser)

router.delete("/users/:id", checkApiKey, deleteUser)

module.exports = router;