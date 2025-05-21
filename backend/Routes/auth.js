const express = require("express")
const router = express.Router();
const { signup, login, logout, authCheck } = require("../Controllers/auth");
const { protectRoute } = require("../middlwares/protectRoute");

router.post("/login", login)
router.post("/signup", signup)
router.post("/logout", logout)

router.get("/authCheck", protectRoute, authCheck)

module.exports = router;