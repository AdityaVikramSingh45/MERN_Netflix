const express = require("express");
const router = express.Router()

const {getNowPlayingTvs, getPopularTvs, getSimilarTvs, getTopRatedTvs, getTrendingTv, getTvTrailers, getUpcomingTvs} = require("../Controllers/tvShow")

router.get("/trending", getTrendingTv);
router.get("/trending/trailers", getTvTrailers);
router.get("/similar", getSimilarTvs)
router.get("/popular", getPopularTvs)
router.get("/topRated", getTopRatedTvs)
router.get("/upcoming", getUpcomingTvs)
router.get("/nowPlaying", getNowPlayingTvs)

module.exports = router;