const express = require("express");
const { getTrendingMovie, getMovieTrailers, getSimilarMovie, getPopularMovie, getTopRatedMovie, getUpcomingMovie, getNowPlayingMovie } = require("../Controllers/movie");
const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/trending/trailers", getMovieTrailers);
router.get("/similar", getSimilarMovie);
router.get("/popular", getPopularMovie);
router.get("/topRated", getTopRatedMovie);
router.get("/upcoming", getUpcomingMovie);
router.get("/nowPlaying", getNowPlayingMovie);

module.exports = router;