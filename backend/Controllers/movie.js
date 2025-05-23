const { fetchFromIMDB, fetchFromDb } = require("../Services/imdbService");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// Same controller for getMovieDetails (":/id/details")
exports.getTrendingMovie = async(req, res)=>{
    try{
        // const data = await fetchFromIMDB("https://imdb236.p.rapidapi.com/imdb/most-popular-movies");
        //  const data = await fetchFromDb("https://moviesverse1.p.rapidapi.com/top-box-office-movies")
        const data = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies");
        console.log("data---->", data)

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Fetched data is not a valid array or it's empty");
          }

        const randomMovie = data[Math.floor(Math.random() * data?.length)];
        // console.log("randomMovie", randomMovie);

        res.status(200).json({
            success: true,
            content: randomMovie,
            message: "Trending movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching trending movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getMovieTrailers = async(req, res)=>{
    const options = {
        headers: {
            Authorization: process.env.PEXEL_API_KEY
        }
        // params: {
        //     per_page: 10 // Fetch 10 videos and pick one randomly
        // }
           
    }

    try{
        const response = await axios.get('https://api.pexels.com/videos/popular', options);
        // console.log("response----->>>", response)

    const videos = response.data.videos;
    
    res.status(200).json({
        success: true,
        trailer: videos
    })
    }
    catch(error){
        console.error('Error fetching videos:', error);
    }
}

exports.getSimilarMovie = async(req, res)=>{
    try{
        const response1 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies");
        const response2 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-rated-english-movies");
        const response3 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/lowest-rated-movies");

        if (!Array.isArray(response1) || !Array.isArray(response2) || !Array.isArray(response3)) {
            throw new Error("One of the responses is not a valid array");
          }
      
        const data = [...response1, ...response2, ...response3];
        // console.log("data---->>>>", data[0])
        // const randomMovie = data[Math.floor(Math.random() * data?.length)];
        // console.log("randomMovie", randomMovie);

        res.status(200).json({
            success: true,
            similar: data,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Similar movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getPopularMovie = async(req, res)=>{
    try{
        const response1 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies");
        const response2 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-rated-english-movies");
        const response3 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/lowest-rated-movies");
        const response = [...response1, ...response2, ...response3];
        res.status(200).json({
            success: true,
            popularContent: response,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Popular movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getTopRatedMovie = async(req, res)=>{
    try{
        const response1 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies");
        const response2 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-rated-english-movies");
        const response3 = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/lowest-rated-movies");
        const response = [...response1, ...response2, ...response3];
        res.status(200).json({
            success: true,
            topRated: response,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Popular movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getUpcomingMovie = async(req, res)=>{
    try{
        const response = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/lowest-rated-movies")
        res.status(200).json({
            success: true,
            upcoming: response,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Popular movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

exports.getNowPlayingMovie = async(req, res)=>{
    try{
        const response = await fetchFromIMDB("https://imdb236.p.rapidapi.com/api/imdb/top-box-office")
        res.status(200).json({
            success: true,
            nowPlaying: response,
            message: "Similar movie get fetched successfully"
        })
    }
    catch(error){
        console.log("Error occured during fetching Popular movie", error);
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}



// exports.getTrendingMovie = async(req, res)=>{
//     try{
//         const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
//         const randomMovie = data.results[Math.floor(Math.random() * data?.results?.length)];

//         res.status(200).json({
//             success: true,
//             content: randomMovie,
//             message: "Trending movie get fetched successfully"
//         })
//     }
//     catch(error){
//         console.log("Error occured during fetching trending movie");
//         res.status(500).json({
//             success: false,
//             message: error.message 
//         })
//     }
// }




