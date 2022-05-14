const router = require("express").Router();
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels } = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/verifyToken");

// CREATE 
router.post("/", verifyAdmin , createHotel);

// UPDATE 
router.put("/:id", verifyAdmin ,updateHotel);

// Delete
router.delete("/:id", verifyAdmin ,deleteHotel);

// GET A SPECIFIC
router.get("/:id" , getHotel)

// GET All
router.get("/" , getHotels)

module.exports = router;