const router = require("express").Router();
const { createRoom, updateRoom, deleteRoom, getRoom, getRooms } = require("../controllers/room.js");
const { verifyAdmin } = require("../utils/verifyToken");

// CREATE 
router.post("/:hotelid", verifyAdmin , createRoom);

// UPDATE 
router.put("/:id", verifyAdmin ,updateRoom);

// Delete
router.delete("/:id/:hotelid", verifyAdmin ,deleteRoom);

// GET A SPECIFIC
router.get("/:id" , getRoom)

// GET All
router.get("/" , getRooms)

module.exports = router;