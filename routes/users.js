const { updateUser, deleteUser, getUser, getUsers } = require("../controllers/user.js");
const { verifyUser, verifyAdmin} = require("../utils/verifyToken.js");

const router = require("express").Router();

// Update User 
router.put("/:id", verifyUser , updateUser );
// Delete User 
router.delete("/:id", verifyUser , deleteUser );
// Get User
router.get("/:id", verifyUser , getUser );
// Get All User 
router.get("/", verifyAdmin , getUsers );

module.exports = router;