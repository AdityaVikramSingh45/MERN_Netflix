const express = require("express");
const router = express.Router();
const {searchMovie, searchPerson, searchTv, removeItemFromSearchHistory, getSearchHistory} = require("../Controllers/search")

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchMovie);

router.get("/history", getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);

module.exports = router